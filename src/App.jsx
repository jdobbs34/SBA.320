import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CharacterListPage from "./pages/CharacterListPage";
import AddCharacterPage from "./pages/AddCharacterPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import StatsPage from "./pages/StatsPage";
// import "./App.css";

// useState - hold the characters array
function App() {
  const [characters, setCharacters] = useState(() => {
    try {
      const saved = localStorage.getItem("characters");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  // useEffect - save to localStorage whenever characters changes
  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <CharacterListPage
              characters={characters}
              setCharacters={setCharacters}
            />
          }
        />
        <Route
          path="/add"
          element={<AddCharacterPage setCharacters={setCharacters} />}
        />
        <Route path="/character/:id" element={<CharacterDetailPage characters={characters} setCharacters={setCharacters}/>} />
        <Route path="/stats" element={<StatsPage characters={characters} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
