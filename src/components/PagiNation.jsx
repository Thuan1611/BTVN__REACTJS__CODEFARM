import React from "react";

const PagiNation = ({ meta, query, setQuery }) => {
  return (
    <div className="flex gap-4 justify-center items-center">
      <button
        className="button-primary px-4 py-2"
        onClick={() => {
          if (meta?.page === 1) {
            return;
          }
          setQuery({ ...query, _page: meta.page - 1 });
        }}
      >
        Prev
      </button>
      <div className="px-4 py-2 font-medium text-gray-700">
        {meta?.page}/{meta?.totalPages}
      </div>
      <button
        className="button-primary px-4 py-2"
        onClick={() => {
          if (meta?.page == meta?.totalPages) {
            return;
          }
          setQuery({ ...query, _page: meta.page + 1 });
        }}
      >
        Next
      </button>
    </div>
  );
};

export default PagiNation;
