/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AppContext } from "../AppContext";
import useUtils from "../utils/utils";

export const Card = ({ card }) => {
  const { setModalContent, setIsModalOpen, setCardColNum, setSelectedCard } =
    useContext(AppContext);

  const { moveCard } = useUtils();

  const openEditModal = () => {
    setCardColNum(card.column);
    setSelectedCard(card);
    setModalContent("card");
    setIsModalOpen(true);
  };

  return (
    <div className="border border-gray-600 my-2 rounded-lg flex overflow-hidden">
      <div className="cursor-pointer w-full p-2" onClick={openEditModal}>
        <div className="flex justify-between">
          <p className="text-gray-200 text-xl">{card.name}</p>
          <p className="text-gray-400 text-sm">ID: {card.id}</p>
        </div>
        <p className="text-gray-400">Description: {card.description}</p>
        <p className="text-gray-400">
          Uses: {card.usesLeft}/{card.maxUses}
        </p>
        <p className="text-gray-400">Recharge form: {card.rechargeForm}</p>
        <p className="text-gray-400">Recharge type: {card.rechargeType}</p>
        <p className="text-gray-400">Recharge amount: {card.rechargeAmount}</p>
      </div>
      <div className="w-10 flex flex-col justify-between border-l border-gray-600">
        <div
          onClick={() => moveCard(card.id, "up")}
          className="cursor-pointer text-center hover:bg-neutral-600 duration-200 border-b border-gray-600">
          ↑
        </div>
        <div
          onClick={() => moveCard(card.id, "down")}
          className="cursor-pointer text-center hover:bg-neutral-600 duration-200 border-t border-gray-600">
          ↓
        </div>
      </div>
    </div>
  );
};
