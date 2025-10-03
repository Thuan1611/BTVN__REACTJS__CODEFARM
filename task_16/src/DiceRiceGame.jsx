import React, { useState } from "react";

const WINNING_POSITION = 30;
const MAX_PLAYERS = 6;
const PLAYER_COLORS = [
  "danger",
  "primary",
  "success",
  "warning",
  "info",
  "secondary",
];

export default function DiceRaceGame() {
  const [gameState, setGameState] = useState("setup");
  const [numPlayers, setNumPlayers] = useState(2);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [diceValue, setDiceValue] = useState(null);
  const [history, setHistory] = useState([]);
  const [winner, setWinner] = useState(null);
  const [isRolling, setIsRolling] = useState(false);

  const createPlayers = (count) => {
    const newPlayers = [];
    for (let i = 0; i < count; i++) {
      newPlayers.push({
        id: i + 1,
        name: `Người chơi ${i + 1}`,
        position: 0,
        color: PLAYER_COLORS[i],
      });
    }
    return newPlayers;
  };

  const createBoard = () => {
    const board = [];
    for (let i = 1; i <= WINNING_POSITION; i++) {
      board.push(i);
    }
    return board;
  };

  const startGame = () => {
    const initialPlayers = createPlayers(numPlayers);
    setPlayers(initialPlayers);
    setGameState("playing");
    setCurrentPlayerIndex(0);
    setHistory([]);
    setWinner(null);
    setDiceValue(null);
  };

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    const roll = Math.floor(Math.random() * 6) + 1;

    setTimeout(() => {
      setDiceValue(roll);
      const currentPlayer = players[currentPlayerIndex];
      const newPosition = Math.min(
        currentPlayer.position + roll,
        WINNING_POSITION
      );

      const updatedPlayers = players.map((player, idx) =>
        idx === currentPlayerIndex
          ? { ...player, position: newPosition }
          : player
      );

      setPlayers(updatedPlayers);

      const historyEntry = {
        player: currentPlayer.name,
        roll: roll,
        newPosition: newPosition,
        color: currentPlayer.color,
      };
      setHistory([historyEntry, ...history]);

      if (newPosition === WINNING_POSITION) {
        setWinner(currentPlayer);
        setGameState("finished");
      } else if (roll !== 6) {
        setCurrentPlayerIndex((currentPlayerIndex + 1) % numPlayers);
      }

      setIsRolling(false);
    }, 500);
  };

  const resetGame = () => {
    setGameState("setup");
    setNumPlayers(2);
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setDiceValue(null);
    setHistory([]);
    setWinner(null);
  };

  const getPlayersAtPosition = (position) => {
    return players.filter((p) => p.position === position);
  };

  if (gameState === "setup") {
    return (
      <>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <div
          className="min-vh-100 bg-gradient d-flex align-items-center justify-content-center p-4"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <div
            className="card shadow-lg"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h1 className="display-4 fw-bold text-primary mb-3">
                  🎲 Cuộc Đua Xúc Xắc
                </h1>
              </div>

              <div className="mb-4">
                <label className="form-label fs-5 fw-semibold">
                  Chọn số lượng người chơi:
                </label>
                <div className="row g-2">
                  {[2, 3, 4, 5, 6].map((num) => (
                    <div className="col-4" key={num}>
                      <button
                        onClick={() => setNumPlayers(num)}
                        className={`btn w-100 ${
                          numPlayers === num
                            ? "btn-primary"
                            : "btn-outline-secondary"
                        }`}
                      >
                        {num} người
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={startGame}
                className="btn btn-lg btn-success w-100 fw-bold"
              >
                Bắt đầu chơi
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <div
        className="min-vh-100 p-4"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="container-fluid">
          <div className="card shadow-lg mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="h2 mb-0 fw-bold">🎲 Cuộc Đua Xúc Xắc</h1>
                <button onClick={resetGame} className="btn btn-secondary">
                  🔄 Chơi lại
                </button>
              </div>

              {winner && (
                <div
                  className="alert alert-warning mt-3 text-center"
                  role="alert"
                >
                  <h2 className="h3 mb-0">🏆 {winner.name} chiến thắng! 🎉</h2>
                </div>
              )}

              {!winner && (
                <div
                  className="alert alert-info mt-3 text-center mb-0"
                  role="alert"
                >
                  <strong className="fs-5">
                    Lượt của: {players[currentPlayerIndex]?.name}
                  </strong>
                </div>
              )}
            </div>
          </div>

          <div className="row g-3">
            <div className="col-lg-8">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h2 className="h4 fw-bold mb-3">Bảng đua</h2>

                  <div className="row g-2 mb-4">
                    {createBoard().map((position) => {
                      const playersAtPos = getPlayersAtPosition(position);

                      return (
                        <div className="col-2" key={position}>
                          <div
                            className={`border rounded text-center p-2 position-relative ${
                              position === WINNING_POSITION
                                ? "bg-warning bg-opacity-25 border-warning"
                                : position % 5 === 0
                                ? "bg-info bg-opacity-10 border-info"
                                : "bg-light"
                            }`}
                            style={{ minHeight: "50px" }}
                          >
                            <small className="text-muted">{position}</small>
                            {playersAtPos.length > 0 && (
                              <div className="position-absolute top-50 start-50 translate-middle">
                                <div className="d-flex gap-1">
                                  {playersAtPos.map((player) => (
                                    <span
                                      key={player.id}
                                      className={`badge bg-${player.color} rounded-circle`}
                                      style={{ width: "12px", height: "12px" }}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="row g-3 mb-4">
                    {players.map((player) => (
                      <div className="col-md-6" key={player.id}>
                        <div
                          className={`card ${
                            currentPlayerIndex === player.id - 1 && !winner
                              ? "border-primary border-2"
                              : ""
                          }`}
                        >
                          <div className="card-body p-3">
                            <div className="d-flex align-items-center gap-2">
                              <span
                                className={`badge bg-${player.color} rounded-circle`}
                                style={{ width: "20px", height: "20px" }}
                              />
                              <strong>{player.name}</strong>
                            </div>
                            <small className="text-muted">
                              Vị trí: {player.position}/30
                            </small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {!winner && (
                    <div className="text-center">
                      {diceValue && (
                        <div className="mb-3">
                          <div
                            className="d-inline-flex align-items-center justify-content-center border border-dark border-4 rounded shadow"
                            style={{
                              width: "80px",
                              height: "80px",
                              background: "white",
                            }}
                          >
                            <span className="display-3 fw-bold">
                              {diceValue}
                            </span>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={rollDice}
                        disabled={isRolling}
                        className="btn btn-lg btn-primary px-5"
                      >
                        🎲 {isRolling ? "Đang tung..." : "Tung xúc xắc"}
                      </button>

                      {diceValue === 6 && (
                        <div className="alert alert-success mt-3 mb-0">
                          🎲 Ra 6! Được tung tiếp!
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h2 className="h4 fw-bold mb-3">Lịch sử</h2>
                  <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                    {history.map((entry, idx) => (
                      <div className="card mb-2" key={idx}>
                        <div className="card-body p-3">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <span
                              className={`badge bg-${entry.color} rounded-circle`}
                              style={{ width: "12px", height: "12px" }}
                            />
                            <strong className="small">{entry.player}</strong>
                          </div>
                          <small className="text-muted">
                            Tung được: <strong>{entry.roll}</strong> → Ô{" "}
                            {entry.newPosition}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
