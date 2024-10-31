/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Card } from "./Card";

const Column = ({ column }) => {
  const { getCardsByColumn } = useContext(AppContext);
  const cards = getCardsByColumn(column.id);

  return (
    <div className="min-w-[250px] bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col space-y-4">
      {/* Header-Bereich nur für Spaltenbewegung */}
      <div className="cursor-move text-lg font-semibold text-center bg-gray-700 p-2 rounded">
        {column.name}
      </div>

      {/* Kartenbereich mit eigenem DndContext */}
      <div className="flex-grow overflow-y-auto space-y-2">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Column;
