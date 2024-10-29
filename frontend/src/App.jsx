import { useContext } from "react";
import { AppContext } from "./AppContext";
import Column from "./components/Column";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

function App() {
  const { columns, cards, moveColumn, moveCard } = useContext(AppContext);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // Handhabt das Verschieben der Spalten
    if (active.data.current.sortableContainerId === "columns") {
      if (over && active.id !== over.id) {
        const activeIndex = columns.findIndex((col) => col.id === active.id);
        const overIndex = columns.findIndex((col) => col.id === over.id);
        moveColumn(activeIndex, overIndex);
      }
    }

    // Handhabt das Verschieben der Karten
    if (active.data.current.sortableContainerId === "cards") {
      const activeCard = cards.find((card) => card.id === active.id);
      const overCard = cards.find((card) => card.id === over.id);

      if (over && activeCard && overCard) {
        const newColumnId = overCard.column;
        const newPos = overCard.pos;
        moveCard(activeCard.id, newColumnId, newPos);
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex h-screen bg-neutral-900 text-white">
        {/* Bereich für Spalten */}
        <div className="w-3/4 flex overflow-x-auto h-full p-4 space-x-5">
          <SortableContext items={columns} strategy={rectSortingStrategy}>
            {columns.map((column) => (
              <Column key={column.id} column={column} />
            ))}
          </SortableContext>
        </div>

        {/* Rechtes Viertel */}
        <div className="w-1/4 bg-neutral-800 p-4">
          <p className="text-center text-xl font-semibold">Rechtes Viertel</p>
        </div>
      </div>
    </DndContext>
  );
}

export default App;
