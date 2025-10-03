import { useState } from "react";
import "./App.css";
import CardFlip from "./CardFlip";

function App() {
  const generateCard = () => {
    const randomId = Math.floor(Math.random() * 12);
    const newCard = [];
    for (let i = 0; i < 12; i++) {
      newCard.push({
        id: i,
        isFlip: false,
        isLucky: i === randomId,
      });
    }
    return newCard;
  };
  const [card, setCard] = useState(generateCard);
  const [status, setStatus] = useState("playing");
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const handleFlip = (id) => {
    const clicked = card.find((prev) => prev.id == id);
    if (clicked.isFlip) return;
    if (status !== "playing") return;
    const displayCard = card.map((item) =>
      item.id == id ? { ...item, isFlip: true } : item
    );
    setCard(displayCard);
    if (clicked.isLucky) {
      return setStatus("win");
    }
    if (!clicked.isLucky) {
      setAttemptsLeft((item) => {
        const newAttem = item - 1;
        if (newAttem <= 0) {
          setStatus("lose");
          // setCard((item) => item.map((prev) => ({ ...prev, isFlip: true })));
          return 0;
        }
        return newAttem;
      });
    }
  };

  return (
    <>
      <div
        className="d-flex gap-2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6,1fr) ",
          gap: 20,
        }}
      >
        {card.map((item) => {
          return (
            <CardFlip
              item={item}
              key={item.id}
              handleFlip={handleFlip}
              generateCard={generateCard}
            />
          );
        })}
        <p>Trạng thái: {status} </p>
        <p>Số lượt chơi: {attemptsLeft} </p>
      </div>
    </>
  );
}

export default App;
