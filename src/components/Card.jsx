/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AppContext } from "../AppContext";

export const Card = ({ card }) => {
  const { setModalContent, setIsModalOpen, setCardColNum, setSelectedCard } =
    useContext(AppContext);

  const openEditModal = () => {
    setCardColNum(card.column);
    setSelectedCard(card);
    setModalContent("card");
    setIsModalOpen(true);
  };

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "5px",
        margin: "5px 0",
        cursor: "pointer",
      }}
      onClick={openEditModal}>
      <h4>{card.name}</h4>
      <p>ID: {card.id}</p>
      <p>Position: {card.pos}</p>
      <p>Beschreibung: {card.description}</p>
      <p>
        Verbleibende Nutzungen: {card.usesLeft}/{card.maxUses}
      </p>
      <p>Spalte: {card.column}</p>
    </div>
  );
};
