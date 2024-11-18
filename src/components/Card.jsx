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
    <div className="border border-gray-500 my-2 rounded-lg flex overflow-hidden">
      <div className="cursor-pointer w-full p-2" onClick={openEditModal}>
        <p>{card.name}</p>
        <p>ID: {card.id}</p>
        <p>Position: {card.pos}</p>
        <p>Description: {card.description}</p>
        <p>
          Uses Left: {card.usesLeft}/{card.maxUses}
        </p>
        <p>Recharge form: {card.rechargeForm}</p>
        <p>Recharge type: {card.rechargeType}</p>
        <p>Recharge amount: {card.rechargeAmount}</p>
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
