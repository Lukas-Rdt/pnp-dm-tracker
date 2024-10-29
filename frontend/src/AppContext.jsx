/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

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

  const moveColumn = (fromIndex, toIndex) => {
    setColumns((prevColumns) => {
      const newColumns = arrayMove(prevColumns, fromIndex, toIndex);
      return newColumns.map((col, index) => ({ ...col, pos: index + 1 }));
    });
  };

  const moveCard = (cardId, newColumnId, newPos) => {
    setCards((prevCards) => {
      const cardToMove = prevCards.find((card) => card.id === cardId);

      // Karten in der alten Spalte neu anordnen
      const updatedCards = prevCards
        .filter((card) => card.id !== cardId)
        .map((card) => {
          if (card.column === cardToMove.column && card.pos > cardToMove.pos) {
            return { ...card, pos: card.pos - 1 };
          }
          return card;
        });

      // Karten in der neuen Spalte einfügen und neu sortieren
      updatedCards.push({ ...cardToMove, column: newColumnId, pos: newPos });
      const sortedCards = updatedCards
        .filter((card) => card.column === newColumnId)
        .sort((a, b) => a.pos - b.pos)
        .map((card, index) => ({ ...card, pos: index + 1 }));

      // Aktualisiere die Positionen in der alten und neuen Spalte
      return updatedCards
        .filter((card) => card.column !== newColumnId)
        .concat(sortedCards);
    });
  };

  const values = {
    columns,
    setColumns,
    cards,
    setCards,
    addColumn,
    addCard,
    getCardsByColumn,
    moveColumn,
    moveCard,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
