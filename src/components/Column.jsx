/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Card } from "./Card";
import Utils from "../utils/utils";

const Column = ({ column }) => {
  const { columns } = useContext(AppContext);
  const { moveCol, getCardsFromCol } = Utils();
  const cards = getCardsFromCol(column.id);

  const colIndex = columns.findIndex((col) => col.id === column.id);

  return (
    <div className="min-w-[250px] bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col space-y-4">
      <div className="flex justify-between items-center bg-gray-700 p-2 rounded">
        <button
          onClick={() => moveCol(column.id, "left")}
          disabled={colIndex === 0}
          className="bg-gray-600 text-white px-2 rounded hover:bg-gray-500 disabled:opacity-50">
          ←
        </button>
        <div className="text-lg font-semibold text-center">{column.name}</div>
        <button
          onClick={() => moveCol(column.id, "right")}
          disabled={colIndex === columns.length - 1}
          className="bg-gray-600 text-white px-2 rounded hover:bg-gray-500 disabled:opacity-50">
          →
        </button>
      </div>

      <div className="flex-grow overflow-y-auto space-y-2">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Column;
