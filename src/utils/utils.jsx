import { useContext } from "react";
import { AppContext } from "../AppContext";

function useUtils() {
  const { columns, setColumns, cards, setCards } = useContext(AppContext);

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

    setColumns([...columns, newColEntry]);
  }

  function addCard(cardData) {
    const usedIds = cards.map((card) => card.id);
    let newId = 1;

    while (usedIds.includes(newId)) {
      newId++;
    }

    const cardsInColumn = cards.filter(
      (card) => card.column === cardData.column
    );

    const usedPos = cardsInColumn.map((card) => card.pos);
    let newPos = 1;

    while (usedPos.includes(newPos)) {
      newPos++;
    }

    const newCardEntry = {
      id: newId,
      pos: newPos,
      ...cardData,
    };

    console.log(newCardEntry);

    setCards([...cards, newCardEntry]);
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
    return cards
      .filter((card) => card.column === colId)
      .sort((a, b) => a.pos - b.pos);
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
    [updatedColumns[colIndex], updatedColumns[newIndex]] = [
      updatedColumns[newIndex],
      updatedColumns[colIndex],
    ];

    setColumns(updatedColumns);
  }

  const moveCard = (id, direction) => {
    setCards((prevCards) => {
      // Die Karte und die aktuelle Spalte finden
      const currentCard = prevCards.find((card) => card.id === id);
      if (!currentCard) return prevCards; // Falls die Karte nicht existiert

      const currentColumn = currentCard.column;

      // Karten in der gleichen Spalte filtern und nach Position sortieren
      const cardsInColumn = prevCards
        .filter((card) => card.column === currentColumn)
        .sort((a, b) => a.pos - b.pos);

      // Die Position der aktuellen Karte im Array finden
      const currentIndex = cardsInColumn.findIndex((card) => card.id === id);
      if (currentIndex === -1) return prevCards; // Sicherheit

      // Zielindex berechnen
      const targetIndex =
        direction === "up" ? currentIndex - 1 : currentIndex + 1;

      // Prüfen, ob der Zielindex gültig ist
      if (targetIndex < 0 || targetIndex >= cardsInColumn.length) {
        return prevCards; // Keine Bewegung möglich
      }

      // Karten tauschen
      const targetCard = cardsInColumn[targetIndex];
      [currentCard.pos, targetCard.pos] = [targetCard.pos, currentCard.pos];

      // State mit den aktualisierten Karten zurückgeben
      return [...prevCards];
    });
  };

  function updateCard(updatedCardData) {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === updatedCardData.id ? updatedCardData : card
      )
    );
  }

  function handleRecharge(rechargeForm, column = null) {
    setCards((prevCards) =>
      prevCards.map((card) => {
        const shouldRecharge =
          ((rechargeForm === "long" &&
            (card.rechargeForm === "long" || card.rechargeForm === "short")) ||
            card.rechargeForm === rechargeForm) &&
          card.rechargeType === "fixed" &&
          (column === null || card.column === column);

        if (shouldRecharge) {
          const newUsesLeft = Math.min(
            card.usesLeft + card.rechargeAmount,
            card.maxUses
          );
          return { ...card, usesLeft: newUsesLeft };
        }
        return card;
      })
    );
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
    updateCard,
    handleRecharge,
    moveCard,
  };
}

export default useUtils;
