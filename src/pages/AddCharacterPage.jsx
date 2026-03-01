import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCharacterPage({ setCharacters }) {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);

  const searchRef = useRef(null);
  const nameRef = useRef(null);
  const speciesRef = useRef(null);
  const statusRef = useRef(null);
  const ratingRef = useRef(null);
  const notesRef = useRef(null);

  const resultsRef = useRef(null);
  const errorRef = useRef(null);
  const imageRef = useRef(null);
  const timerRef = useRef(null);
  const apiIdRef = useRef("");

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  useEffect(() => {
    const input = searchRef.current;

    const handleInput = () => {
      clearTimeout(timerRef.current);
      const query = input.value.trim();

      if (query.length < 2) {
        setResults([]);
        return;
      }

      timerRef.current = setTimeout(async () => {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character?name=${encodeURIComponent(query)}`,
        );
        const data = await res.json();
        setResults(data.results || []);
      }, 400);
    };

    input.addEventListener(`input`, handleInput);
    return () => input.removeEventListener("input", handleInput);
  }, []);

  const handleSelect = (character) => {
    selectedRef.current = character;
    searchRef.current.value = character.name;
    setResults([]);
  };

  const handleSave = () => {
    if (!selectedRef.current) {
      errorRef.current.textContent = "Please select a character first";
      errorRef.current.style.display = "book";
      return;
    }

    const newCharacter = {
      id: Date.now().toString(),
      name: selectedRef.current.name,
      image: selectedRef.current.image,
      species: selectedRef.current.species,
      origin: selectedRef.current.origin.name,
      status: statusRef.current.value,
      rating: selectedRef.current.value
        ? Number(ratingRef.current.value)
        : null,
      notes: notesRef.current.value.trim(),
    };

    setCharacters((prev) => [newCharacter, ...prev]);
    navigate("/");
  };

  return (
    <div className="page">
      <h1>Add Character</h1>

      <div>
        <label>Search Rick and Morty</label>
        <input ref={searchRef} placeholder="Search by character name..." />
      </div>

      {results.length > 0 && (
        <div className="search-results">
          {results.map((character) => (
            <div
              key={character.id}
              className="book-card"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelect(character)}>
              <img src={character.image} alt={character.name} />
              <div>
                <h3>{character.name}</h3>
                <p>{character.species}</p>
                <p>{character.origin.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="form-group" style={{ marginTop: "1rem" }}>
        <label>Status</label>
        <select ref={statusRef} defaultValue="want to watch">
          <option value="want to watch">Want to watch</option>
          <option value="watching">Watching</option>
          <option value="watched">Watched</option>
        </select>
      </div>

      <div className="form-group">
        <label>Rating</label>
        <select ref={ratingRef} defaultValue="">
          <option value="1">1⭐</option>
          <option value="2">2⭐⭐</option>
          <option value="3">3⭐⭐⭐</option>
          <option value="4">4⭐⭐⭐⭐</option>
          <option value="5">5⭐⭐⭐⭐⭐</option>
        </select>
      </div>

      <div className="form-group" >
        <label>Notes</label>
        <textarea ref={notesRef} rows='3' placeholder="Your thoughts..." ></textarea>
      </div>

      <p ref={errorRef} style={{ display: 'none', color: 'red', marginBottom: '1rem'}} > 

        <button onClick={()=> navigate('/')} >Cancel</button>
        <button className="btn-primary" onClick={handleSave} >Save</button>
      </p>
    </div>
  );
}
