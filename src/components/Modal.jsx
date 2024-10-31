/* eslint-disable react/prop-types */
const Modal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}>
      <div
        className="bg-white w-[80%] h-[80%] rounded-lg shadow-lg flex flex-col p-6"
        onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-4">Neue Spalte erstellen</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const name = e.target.elements.columnName.value;
            onSubmit(name);
            e.target.reset();
            onClose();
          }}>
          <input
            type="text"
            name="columnName"
            required
            placeholder="Spaltenname"
            className="border border-gray-300 p-2 rounded w-full mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded">
            Erstellen
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-red-500">
          Abbrechen
        </button>
      </div>
    </div>
  );
};

export default Modal;
