import { useContext } from "react";
import { AppContext } from "./AppContext";
import Column from "./components/Column";
import Modal from "./components/Modal";
import Utils from "./utils/utils";

function App() {
  const {
    columns,
    isModalOpen,
    setIsModalOpen,
    modalContent,
    setModalContent,
  } = useContext(AppContext);
  const { addCol, addCard } = Utils();

  const handleAdding = (data) => {
    if (modalContent === "column") {
      addCol(data.name);
    } else if (modalContent === "card") {
      addCard({
        name: data.name,
        column: parseInt(data.column),
        desc: data.desc,
        maxUses: parseInt(data.maxUses),
        usesLeft: parseInt(data.usesLeft),
      });
    }
  };

  const openColModal = () => {
    setModalContent("column");
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      <div className="w-3/4 flex overflow-x-auto h-full p-4 space-x-5">
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
        <button
          onClick={openColModal}
          className="p-3 w-[300px] h-min bg-neutral-600 rounded-lg">
          New Col
        </button>
      </div>

      <div className="w-1/4 bg-neutral-800 p-4">
        <p className="text-center text-xl font-semibold">Control Area</p>
        <p>{isModalOpen}</p>
      </div>

      {/* Modal to add Col/Cards */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAdding}
      />
    </div>
  );
}

export default App;
