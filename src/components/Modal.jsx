/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../AppContext";
import useUtils from "../utils/utils";

const Modal = ({ isOpen, onClose }) => {
  const { modalContent, selectedCard, cardColNum } = useContext(AppContext);
  const { addCol, addCard, updateCard } = useUtils();

  const [formData, setFormData] = useState({
    columnName: "",
    cardColumn: "",
    description: "",
    maxUses: "",
    usesLeft: "",
    rechargeForm: "short",
    rechargeType: "fixed",
    rechargeAmount: "",
  });

  useEffect(() => {
    if (modalContent === "card" && selectedCard) {
      setFormData({
        columnName: selectedCard.name || "",
        cardColumn: selectedCard.column || "",
        description: selectedCard.description || "",
        maxUses: selectedCard.maxUses || "0",
        usesLeft: selectedCard.usesLeft || "0",
        rechargeForm: selectedCard.rechargeForm || "short",
        rechargeType: selectedCard.rechargeType || "fixed",
        rechargeAmount: selectedCard.rechargeAmount || "",
      });
    } else {
      setFormData({
        columnName: "",
        cardColumn: "",
        description: "",
        maxUses: "0",
        usesLeft: "0",
        rechargeForm: "short",
        rechargeType: "fixed",
        rechargeAmount: "",
      });
    }
  }, [modalContent, selectedCard]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIncrement = (field) => {
    setFormData((prev) => {
      const newValue = Math.max(0, parseInt(prev[field] || "0", 10) + 1);
      if (field === "usesLeft" && newValue > parseInt(prev.maxUses, 10)) {
        return { ...prev, [field]: newValue, maxUses: newValue };
      }
      return { ...prev, [field]: newValue };
    });
  };

  const handleDecrement = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Math.max(0, parseInt(prev[field] || "0", 10) - 1),
    }));
  };

  const handleRechargeFormChange = (value) => {
    setFormData((prev) => ({ ...prev, rechargeForm: value }));
  };

  const handleRechargeTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      rechargeType: value,
      rechargeAmount: "",
    }));
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
        rechargeForm: formData.rechargeForm,
        rechargeType: formData.rechargeType,
        rechargeAmount: formData.rechargeAmount,
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between space-y-4 h-full">
          <div className="flex h-full space-x-5">
            <div className="w-1/2 flex flex-col space-y-1">
              <label htmlFor="columnName" className="text-white">
                Column/Card Name
              </label>
              <input
                type="text"
                id="columnName"
                name="columnName"
                required
                value={formData.columnName || ""}
                onChange={handleChange}
                placeholder="Enter name"
                className="bg-neutral-700 border border-gray-300 p-2 rounded"
                autoComplete="off"
              />
              {modalContent === "card" && (
                <>
                  <label htmlFor="description" className="text-white">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    placeholder="Enter description"
                    className="bg-neutral-700 border border-gray-300 p-2 rounded h-80 w-full resize-none overflow-y-auto"
                    autoComplete="off"
                  />
                </>
              )}
            </div>
            <div className="w-1/2 flex flex-col space-y-1">
              {modalContent === "card" && (
                <>
                  <label className="text-white">Max Charges</label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleDecrement("maxUses")}
                      className="bg-red-500 text-white px-3 py-1 rounded">
                      -
                    </button>
                    <input
                      type="number"
                      name="maxUses"
                      value={formData.maxUses || ""}
                      onChange={handleChange}
                      placeholder="Max charges"
                      className="bg-neutral-700 border border-gray-300 p-2 rounded w-full"
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() => handleIncrement("maxUses")}
                      className="bg-green-500 text-white px-3 py-1 rounded">
                      +
                    </button>
                  </div>
                  <label className="text-white">Charges Left</label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleDecrement("usesLeft")}
                      className="bg-red-500 text-white px-3 py-1 rounded">
                      -
                    </button>
                    <input
                      type="number"
                      name="usesLeft"
                      value={formData.usesLeft || ""}
                      onChange={handleChange}
                      placeholder="Charges left"
                      className="bg-neutral-700 border border-gray-300 p-2 rounded w-full"
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() => handleIncrement("usesLeft")}
                      className="bg-green-500 text-white px-3 py-1 rounded">
                      +
                    </button>
                  </div>
                  <label className="text-white">Recharge Form</label>
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
                      other
                    </div>
                  </div>
                  <label className="text-white">Recharge Type</label>
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
                  <label htmlFor="rechargeAmount" className="text-white">
                    Recharge Amount
                  </label>
                  <input
                    id="rechargeAmount"
                    type={formData.rechargeType === "fixed" ? "number" : "text"}
                    name="rechargeAmount"
                    value={formData.rechargeAmount || ""}
                    onChange={handleChange}
                    placeholder={
                      formData.rechargeType === "fixed"
                        ? "Amount for Fixed"
                        : "String for Rolled"
                    }
                    className="bg-neutral-700 border border-gray-300 p-2 rounded w-full mt-2"
                    autoComplete="off"
                  />
                </>
              )}
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 rounded">
            {selectedCard ? "update" : "create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
