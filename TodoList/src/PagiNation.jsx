import React from "react";

const PagiNation = ({ meta, page, setPage }) => {
  return (
    <div className="flex gap-4 justify-center align-items-center">
      <button
        className="border rounded-full px-4 py-2"
        onClick={() => {
          if (page === 1) return;
          setPage(page - 1);
        }}
      >
        -
      </button>
      {Array.from({ length: meta?.totalPages }).map((_, index) => {
        return (
          <div key={index}>
            <button
              className="button-primary px-4 py-2 "
              onClick={(e) => setPage(Number(e.target.innerText))}
            >
              {index + 1}
            </button>
          </div>
        );
      })}
      <button
        className="border rounded-full px-4 py-2"
        onClick={() => {
          if (page == meta.totalPages) {
            console.log("hehe");
            return;
          }
          console.log(setPage(page + 1));
        }}
      >
        +
      </button>
    </div>
  );
};

export default PagiNation;
