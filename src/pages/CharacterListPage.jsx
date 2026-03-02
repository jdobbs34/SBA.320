import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Function and hooks
export default function CharacterListPage({ characters, setCharacters }) {
  const navigate = useNavigate();

  const filterRef = useRef("all");
  const listRef = useRef(null);

  // useEffect to filter when page loads
  useEffect(() => {
    if (!listRef.current) return;
    const cards = listRef.current.querySelectorAll(".character-card");
    cards.forEach((card) => {
      const status = card.getAttribute("data-status");
      if (filterRef.current === "all" || status === filterRef.current) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });

  // Filter click handler
  const handleFilter = (value) => {
    filterRef.current = value;
    document.querySelectorAll(".filters button").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-value") === value);
    });
    if (!listRef.current) return;
    const cards = listRef.current.querySelectorAll(".character-card");
    cards.forEach((card) => {
      const status = card.getAttribute("data-status");
      if (value === "all" || status === value) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  };

  // Delete handler
  const handleDelete = (id) => {
    if (!window.confirm("Delete this character?")) return;
    setCharacters(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="page">
      <h1>My Characters</h1>

      <div className="filters">
        <button
          data-value="all" className="active" onClick={() => handleFilter("all")}>
          All
        </button>
        <button data-value="want to watch" onClick={() => handleFilter("want to watch")}>
          Want to watch
        </button>
        <button data-value="watching" onClick={() => handleFilter("watching")}>
          Watching
        </button>
        <button data-value="watched" onClick={() => handleFilter("watched")}>
          Watched
        </button>
      </div>

      {characters.length === 0 && <p>No characters yet. Add one!</p>}

      <div ref={listRef}>
        {characters.map((character) => (
          <div
            key={character.id}
            className="character-card"
            data-status={character.status}>
            {character.image && (
              <img src={character.image} alt={character.age} />
            )}
            <div>
              <h3>{character.name}</h3>
              <p>{character.species}</p>
              <p>{character.origin}</p>
              <p>{character.status}</p>
              {character.rating && <p>{"⭐".repeat(character.rating)}</p>}
              <div style={{ marginTop: " 0.5rem" }}>
                <button
                  className="btn-primary"
                  onClick={() => navigate(`/character/${character.id}`)}>
                  Edit
                </button>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(character.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
