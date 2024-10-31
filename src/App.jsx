import { useContext } from "react";
import { AppContext } from "./AppContext";
import Column from "./components/Column";
import Modal from "./components/Modal";
import Utils from "./utils/utils";

function App() {
  const { columns, isModalOpen, setIsModalOpen } = useContext(AppContext);
  const { addCol } = Utils();

  const handleAddColumn = (name) => {
    addCol(name);
  };

  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      <div className="w-3/4 flex overflow-x-auto h-full p-4 space-x-5">
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
        <button onClick={() => setIsModalOpen(true)}>New Col</button>
      </div>

      <div className="w-1/4 bg-neutral-800 p-4">
        <p className="text-center text-xl font-semibold">Control Area</p>
        <p>{isModalOpen}</p>
      </div>

      {/* Modal to add Col/Cards */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddColumn}
      />
    </div>
  );
}

export default App;
