import { useContext } from "react";
import { AppContext } from "./AppContext";
import Column from "./components/Column";

function App() {
  const { columns } = useContext(AppContext);

  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      {/* Bereich für Spalten */}
      <div className="w-3/4 flex overflow-x-auto h-full p-4 space-x-5">
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>

      {/* Rechtes Viertel */}
      <div className="w-1/4 bg-neutral-800 p-4">
        <p className="text-center text-xl font-semibold">Rechtes Viertel</p>
      </div>
    </div>
  );
}

export default App;
