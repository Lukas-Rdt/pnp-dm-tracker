/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../AppContext";
import Utils from "../utils/utils";

const Modal = ({ isOpen, onClose }) => {
  const { modalContent, selectedCard, cardColNum } = useContext(AppContext);
  const { addCol, addCard, updateCard } = Utils();

  const [formData, setFormData] = useState({
    columnName: "",
    cardColumn: "",
    description: "",
    maxUses: "",
    usesLeft: "",
    rechargeForm: "short", // Standardwert für rechargeForm
    rechargeType: "fixed", // Standardwert für rechargeType
    rechargeAmount: "", // Wert für das zusätzliche Eingabefeld
  });

  useEffect(() => {
    if (modalContent === "card" && selectedCard) {
      setFormData({
        columnName: selectedCard.name || "",
        cardColumn: selectedCard.column || "",
        description: selectedCard.description || "",
        maxUses: selectedCard.maxUses || "",
        usesLeft: selectedCard.usesLeft || "",
        rechargeForm: selectedCard.rechargeForm || "short", // Lade den Wert von selectedCard oder nutze "short" als Standard
        rechargeType: selectedCard.rechargeType || "fixed", // Standard "fixed" wenn leer
        rechargeAmount: selectedCard.rechargeAmount || "", // Lade den gespeicherten Wert oder leer
      });
    } else {
      setFormData({
        columnName: "",
        cardColumn: "",
        description: "",
        maxUses: "",
        usesLeft: "",
        rechargeForm: "short", // Standardwert für rechargeForm
        rechargeType: "fixed", // Standardwert für rechargeType
        rechargeAmount: "", // Initial leer
      });
    }
  }, [modalContent, selectedCard]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRechargeFormChange = (value) => {
    setFormData((prev) => ({ ...prev, rechargeForm: value }));
  };

  const handleRechargeTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      rechargeType: value,
      rechargeAmount: "",
    })); // Setzt rechargeAmount zurück, wenn rechargeType wechselt
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalContent === "column") {
      addCol(formData.columnName);
    } else if (modalContent === "card") {
      const cardData = {
        name: formData.columnName,
        column: parseInt(formData.cardColumn) || cardColNum,
        description: formData.description,
        maxUses: parseInt(formData.maxUses),
        usesLeft: parseInt(formData.usesLeft),
        rechargeForm: formData.rechargeForm, // Übergibt den Wert für rechargeForm
        rechargeType: formData.rechargeType, // Übergibt den Wert für rechargeType
        rechargeAmount: `${formData.rechargeType}:${formData.rechargeAmount}`, // Formatiert rechargeAmount wie "fixed:X" oder "rolled:X"
      };

      if (selectedCard) {
        updateCard({ ...selectedCard, ...cardData });
      } else {
        addCard(cardData);
      }
    }

    onClose();
  };

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}>
      <div
        className="bg-gray-700 w-[80%] h-[80%] rounded-lg shadow-lg flex flex-col p-6"
        onClick={(e) => e.stopPropagation()}>
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {modalContent === "column" ? "New column" : "New card"}
          </h2>
          <button onClick={onClose} className="text-red-500 flex items-center">
            x
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="columnName"
            required
            value={formData.columnName || ""}
            onChange={handleChange}
            placeholder="Spaltenname/Kartenname"
            className="bg-neutral-700 border border-gray-300 p-2 rounded w-full"
            autoComplete="off"
          />
          {modalContent === "card" && (
            <>
              <input
                type="text"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Beschreibung"
                className="bg-neutral-700 border border-gray-300 p-2 rounded w-full"
                autoComplete="off"
              />
              <input
                type="number"
                name="maxUses"
                value={formData.maxUses || ""}
                onChange={handleChange}
                placeholder="Maximale Nutzungen"
                className="bg-neutral-700 border border-gray-300 p-2 rounded w-full"
                autoComplete="off"
              />
              <input
                type="number"
                name="usesLeft"
                value={formData.usesLeft || ""}
                onChange={handleChange}
                placeholder="Verbleibende Nutzungen"
                className="bg-neutral-700 border border-gray-300 p-2 rounded w-full"
                autoComplete="off"
              />
              <div className="flex justify-between">
                <div
                  onClick={() => handleRechargeFormChange("short")}
                  className={`p-3 rounded border border-gray-300 cursor-pointer ${
                    formData.rechargeForm === "short"
                      ? "bg-blue-500 text-white"
                      : "bg-neutral-700"
                  }`}>
                  short
                </div>
                <div
                  onClick={() => handleRechargeFormChange("long")}
                  className={`p-3 rounded border border-gray-300 cursor-pointer ${
                    formData.rechargeForm === "long"
                      ? "bg-blue-500 text-white"
                      : "bg-neutral-700"
                  }`}>
                  long
                </div>
                <div
                  onClick={() => handleRechargeFormChange("daily")}
                  className={`p-3 rounded border border-gray-300 cursor-pointer ${
                    formData.rechargeForm === "daily"
                      ? "bg-blue-500 text-white"
                      : "bg-neutral-700"
                  }`}>
                  once a day (e.g. at dawn)
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div
                  onClick={() => handleRechargeTypeChange("fixed")}
                  className={`p-3 rounded border border-gray-300 cursor-pointer ${
                    formData.rechargeType === "fixed"
                      ? "bg-blue-500 text-white"
                      : "bg-neutral-700"
                  }`}>
                  Fixed
                </div>
                <div
                  onClick={() => handleRechargeTypeChange("rolled")}
                  className={`p-3 rounded border border-gray-300 cursor-pointer ${
                    formData.rechargeType === "rolled"
                      ? "bg-blue-500 text-white"
                      : "bg-neutral-700"
                  }`}>
                  Rolled
                </div>
              </div>
              <input
                type={formData.rechargeType === "fixed" ? "number" : "text"}
                name="rechargeAmount"
                value={formData.rechargeAmount || ""}
                onChange={handleChange}
                placeholder={
                  formData.rechargeType === "fixed"
                    ? "Anzahl für Fixed"
                    : "String für Rolled"
                }
                className="bg-neutral-700 border border-gray-300 p-2 rounded w-full mt-2"
                autoComplete="off"
              />
            </>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded">
            {selectedCard ? "update" : "create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
