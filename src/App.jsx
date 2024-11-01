import { useContext } from "react";
import { AppContext } from "./AppContext";
import Column from "./components/Column";
import Modal from "./components/Modal";

function App() {
  const {
    columns,
    isModalOpen,
    setIsModalOpen,
    setModalContent,
    setCardColNum,
    setSelectedCard,
  } = useContext(AppContext);

  const openColModal = () => {
    setModalContent("column");
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setCardColNum(null);
    setSelectedCard(null);
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
      <Modal isOpen={isModalOpen} onClose={onModalClose} />
    </div>
  );
}

export default App;
