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
    setModalContent,
    setCardColNum,
    setSelectedCard,
    resetToLocalStorage,
  } = useContext(AppContext);

  const { handleRecharge } = Utils();

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

  const clearStorage = () => {
    localStorage.clear();
    resetToLocalStorage();
    console.log(localStorage);
  };

  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      <div className="w-3/4 flex overflow-x-auto h-full p-4 space-x-5">
        {columns != null &&
          columns.map((column) => <Column key={column.id} column={column} />)}
        <button
          onClick={openColModal}
          className="p-3 w-[300px] h-min bg-neutral-600 rounded-lg">
          New Col
        </button>
      </div>

      <div className="w-1/4 bg-neutral-800 p-4">
        <p className="text-center text-xl font-semibold mb-10">Control Area</p>
        <div className="h-[90%] flex flex-col justify-between">
          <div className="flex justify-evenly">
            <div
              className="p-3 bg-neutral-600 rounded hover:bg-neutral-500 duration-200 hover:cursor-pointer"
              onClick={() => handleRecharge("short")}>
              Short Rest
            </div>
            <div
              className="p-3 bg-neutral-600 rounded hover:bg-neutral-500 duration-200 hover:cursor-pointer"
              onClick={() => handleRecharge("long")}>
              Long Rest
            </div>
          </div>
          <div
            className="p-3 bg-red-600 rounded hover:bg-neutral-500 duration-200 hover:cursor-pointer text-center font-bold"
            onClick={() => clearStorage()}>
            Clear LocalStorage
          </div>
        </div>
      </div>

      {/* Modal to add Col/Cards */}
      <Modal isOpen={isModalOpen} onClose={onModalClose} />
    </div>
  );
}

export default App;
