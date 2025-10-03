import React from "react";

const CardFlip = ({ item,handleFlip }) => {
  return (
    <div
      className="card"
      style={{
        background: item.isFlip ? (item.isLucky ? "green" : "red") : "yellow",
        border: "1px solid black",
        padding: "20px",
        textAlign: "center",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={() => handleFlip(item.id)}
      key={item.id}
    >
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-body-secondary">
          {item.isFlip ? (
            <span>{item.isLucky ? "Lucky" : "Unlucky"}</span>
          ) : (
            "?"
          )}
        </h6>
      </div>
    </div>
  );
};

export default CardFlip;
