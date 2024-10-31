/* eslint-disable react/prop-types */
export const Card = ({ card }) => {
  return (
    <div style={{ border: "1px solid gray", padding: "5px", margin: "5px 0" }}>
      <h4>{card.name}</h4>
      <p>ID: {card.id}</p>
      <p>Position: {card.pos}</p>
      <p>Beschreibung: {card.description}</p>
      <p>
        Verbleibende Nutzungen: {card.usesLeft}/{card.maxUses}
      </p>
      <p>{card.column}</p>
    </div>
  );
};
