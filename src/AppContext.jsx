/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [columns, setColumns] = useState([
    { id: 1, name: "ToDo", pos: 1 },
    { id: 2, name: "InProgress", pos: 2 },
    { id: 3, name: "Done", pos: 3 },
  ]);

  // forms: short, long, once a day
  // amount: fixed, rolled
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Task 1",
      column: 3,
      pos: 1,
      description: "Beschreibung 1",
      maxUses: 5,
      usesLeft: 2,
      rechargeForm: "short",
      rechargeType: "fixed",
      rechargeAmount: 2,
    },
  ]);

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [cardColNum, setCardColNum] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const values = {
    columns,
    setColumns,
    cards,
    setCards,
    isModalOpen,
    setIsModalOpen,
    modalContent,
    setModalContent,
    cardColNum,
    setCardColNum,
    selectedCard,
    setSelectedCard,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
