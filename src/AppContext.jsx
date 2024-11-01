/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

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
      column: 1,
      pos: 1,
      description: "Beschreibung 1",
      maxUses: 5,
      usesLeft: 3,
    },
    {
      id: 2,
      name: "Task 2",
      column: 2,
      pos: 1,
      description: "Beschreibung 2",
      maxUses: 4,
      usesLeft: 2,
    },
    {
      id: 3,
      name: "Task 3",
      column: 3,
      pos: 1,
      description: "Beschreibung 3",
      maxUses: 6,
      usesLeft: 6,
    },
    {
      id: 4,
      name: "Task 4",
      column: 3,
      pos: 2,
      description: "Beschreibung 4",
      maxUses: 6,
      usesLeft: 6,
    },
  ]);

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
