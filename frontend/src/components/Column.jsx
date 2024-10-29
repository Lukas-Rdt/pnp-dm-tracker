/* eslint-disable react/prop-types */
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableCard } from "./SortableCard";
import { useContext } from "react";
import { AppContext } from "../AppContext";

const Column = ({ column }) => {
  const { getCardsByColumn } = useContext(AppContext);
  const cards = getCardsByColumn(column.id);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: column.id,
      data: { sortableContainerId: "columns" },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="min-w-[250px] bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col space-y-4">
      <h3 className="text-lg font-semibold text-center">{column.name}</h3>
      <div className="flex-grow overflow-y-auto space-y-2">
        {cards.map((card) => (
          <SortableCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Column;
