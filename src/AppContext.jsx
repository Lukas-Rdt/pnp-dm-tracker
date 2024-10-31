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

  const addColumn = (name) => {
    const pos = columns.length + 1;
    const newColumn = { id: Date.now(), name, pos };
    setColumns((prevColumns) =>
      [...prevColumns, newColumn].sort((a, b) => a.pos - b.pos)
    );
  };

  const addCard = (name, column, description, maxUses) => {
    const pos = getCardsByColumn(column).length + 1;
    const newCard = {
      id: Date.now(),
      name,
      column,
      pos,
      description,
      maxUses,
      usesLeft: maxUses,
    };
    setCards((prevCards) =>
      [...prevCards, newCard].sort((a, b) => a.pos - b.pos)
    );
  };

  const getCardsByColumn = (columnId) => {
    return cards
      .filter((card) => card.column === columnId)
      .sort((a, b) => a.pos - b.pos);
  };

  const values = {
    columns,
    setColumns,
    cards,
    setCards,
    addColumn,
    addCard,
    getCardsByColumn,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};