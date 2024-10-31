import { useContext, useState } from "react";
import { AppContext } from "../AppContext";

/* eslint-disable react/prop-types */
const Modal = ({ isOpen, onClose, onSubmit }) => {
  const { modalContent, cardColNum } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    column: cardColNum,
    desc: "",
    maxUses: 0,
    usesLeft: 0,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}>
      <div
        className="bg-gray-700 w-[80%] h-[80%] rounded-lg shadow-lg flex flex-col p-6 relative"
        onClick={(e) => e.stopPropagation()}>
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            {modalContent === "column" ? "New Card" : "New Column"}
          </h2>
          <button onClick={onClose} className="text-red-500 text-lg">
            x
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-grow space-y-4">
          {modalContent === "column" ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Spaltenname"
              className="bg-neutral-700 text-white border border-gray-300 p-2 rounded w-full"
            />
          ) : (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Kartenname"
                className="bg-neutral-700 text-white border border-gray-300 p-2 rounded w-full"
              />
              <input
                type="number"
                name="column"
                value={formData.column}
                onChange={handleChange}
                required
                placeholder={cardColNum}
                className="bg-neutral-700 text-white border border-gray-300 p-2 rounded w-full"
              />
              <input
                type="text"
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                required
                placeholder="Beschreibung"
                className="bg-neutral-700 text-white border border-gray-300 p-2 rounded w-full"
              />
              <input
                type="number"
                name="maxUses"
                value={formData.maxUses}
                onChange={handleChange}
                required
                placeholder="Maximale Verwendungen"
                className="bg-neutral-700 text-white border border-gray-300 p-2 rounded w-full"
              />
              <input
                type="number"
                name="usesLeft"
                value={formData.usesLeft}
                onChange={handleChange}
                required
                placeholder="Verbleibende Verwendungen"
                className="bg-neutral-700 text-white border border-gray-300 p-2 rounded w-full"
              />
            </>
          )}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
