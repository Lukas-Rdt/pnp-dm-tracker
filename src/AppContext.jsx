/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // Definiere die Standardwerte für columns und cards
  const initialColumns = [{ id: 1, name: "1", pos: 1 }];
  const initialCards = [
    {
      id: 1,
      name: "1",
      column: 1,
      pos: 1,
      description: "",
      maxUses: 1,
      usesLeft: 1,
      rechargeForm: "short",
      rechargeType: "fixed",
      rechargeAmount: 1,
    },
  ];

  // Lade die Daten aus dem localStorage, falls sie vorhanden sind, ansonsten Standardwerte verwenden
  const [columns, setColumns] = useState(
    JSON.parse(localStorage.getItem("columns")) || initialColumns
  );
  const [cards, setCards] = useState(
    JSON.parse(localStorage.getItem("cards")) || initialCards
  );

  // Speichere die columns und cards bei jeder Änderung im localStorage
  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [cardColNum, setCardColNum] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  // Methode, um die columns und cards aus dem localStorage zu aktualisieren
  const resetToLocalStorage = () => {
    // Setze die State-Werte auf die Standardwerte zurück
    setColumns(initialColumns);
    setCards(initialCards);

    // Speichere die Standardwerte im localStorage
    localStorage.setItem("columns", JSON.stringify(initialColumns));
    localStorage.setItem("cards", JSON.stringify(initialCards));
  };

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
    resetToLocalStorage, // Die Methode zum Zurücksetzen auf die Standardwerte
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
