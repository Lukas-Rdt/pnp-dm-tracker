import { useContext } from "react";
import { AppContext } from "../AppContext";

function Utils() {
  const { columns, setColumns, cards, setCards } = useContext(AppContext);

  function validateColObject(obj) {
    return obj && typeof obj.id === "number" && typeof obj.name === "string";
  }

  function validateCardObject(obj) {
    return (
      obj &&
      typeof obj.id === "number" &&
      typeof obj.name === "string" &&
      typeof obj.col === "number" &&
      typeof obj.desc === "string"
    );
  }

  function addCol(name) {
    const usedIds = columns.map((col) => col.id);
    let newId = 1;

    while (usedIds.includes(newId)) {
      newId++;
    }

    const newColEntry = {
      id: newId,
      name: name,
    };

    if (validateColObject(newColEntry)) {
      setColumns([...columns, newColEntry]);
    } else {
      console.log("Failed to add new column");
    }
  }

  function addCard(name, col, desc) {
    const usedIds = cards.map((card) => card.id);
    let newId = 1;

    while (usedIds.includes(newId)) {
      newId++;
    }

    const newCardEntry = {
      id: newId,
      name: name,
      col: col,
      desc: desc,
    };

    if (validateCardObject(newCardEntry)) {
      setCards([...cards, newCardEntry]);
    } else {
      console.log(`Failed to add new Card to Col ${col}`);
    }
  }

  function deleteCol(id) {
    setColumns(columns.filter((col) => col.id !== id));
  }

  function deleteCard(id) {
    setCards(cards.filter((card) => card.id !== id));
  }

  function findCol(id) {
    const foundCol = columns.find((col) => col.id === id);
    return foundCol || {};
  }

  function findCard(id) {
    const foundCard = cards.find((card) => card.id === id);
    return foundCard || {};
  }

  function getCardsFromCol(colId) {
    return cards.filter((card) => card.column === colId);
  }

  function moveCol(currentId, direction) {
    const colIndex = columns.findIndex((col) => col.id === currentId);

    if (colIndex === -1) {
      console.log("Column not found");
      return;
    }

    const newIndex = direction === "left" ? colIndex - 1 : colIndex + 1;

    if (newIndex < 0 || newIndex >= columns.length) {
      console.log("Cannot move column outside the bounds");
      return;
    }

    const updatedColumns = [...columns];
    // Swap columns
    [updatedColumns[colIndex], updatedColumns[newIndex]] = [
      updatedColumns[newIndex],
      updatedColumns[colIndex],
    ];

    setColumns(updatedColumns);
  }

  return {
    addCol,
    addCard,
    deleteCol,
    deleteCard,
    findCol,
    findCard,
    getCardsFromCol,
    moveCol,
  };
}

export default Utils;
