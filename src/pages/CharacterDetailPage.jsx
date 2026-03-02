import { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Function and hooks
export default function CharacterDetailPage({ characters, setCharacters }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // useRef for all edit inputs
  const statusRef = useRef(null);
  const ratingRef = useRef(null);
  const notesRef = useRef(null);

  //useRef for UI elements
  const nameRef = useRef(null);
  const speciesRef = useRef(null);
  const originRef = useRef(null);
  const imageRef = useRef(null);
  const successRef = useRef(null);

  // useEffect to load character data when page opens
  useEffect(() => {
    const character = characters.find((c) => c.id === id);
    if (!character) return navigate("/");

    if (nameRef.current) nameRef.current.textContent = character.name;
    if (speciesRef.current) speciesRef.current.textContent = character.species;
    if (originRef.current) originRef.current.textContent = character.origin;
    if (statusRef.current) statusRef.current.value = character.status;
    if (ratingRef.current) ratingRef.current.value = character.rating || "";
    if (notesRef.current) notesRef.current.value = character.notes || "";

    if (character.image && imageRef.current) {
      imageRef.current.src = character.image;
      imageRef.current.style.display = "block";
    }
  }, [id]);

  // Update handler
  const handleUpdate = (e) => {
    e.preventDefault();
    const character = characters.find((c) => c.id === id);

    const updated = {
      ...character,
      status: statusRef.current.value,
      rating: ratingRef.current.value ? Number(ratingRef.current.value) : null,
      notes: notesRef.current.value.trim(),
    };

    setCharacters((prev) => prev.map((c) => (c.id === id ? updated : c)));

    successRef.current.textContent = "Updated!";
    successRef.current.style.display = "block";
    setTimeout(() => {
      successRef.current.style.display = "none";
    }, 2000);
  };

  // Delete handler
  const handleDelete = () => {
    if (!window.confirm("Delete this character?")) return;
    setCharacters(prev => prev.filter(c => c.id !== id));
    navigate("/");
  };

  return (
    <div className="page">
      <button onClick={() => navigate("/")}>⬅️Back</button>
      <img
        ref={imageRef}
        style={{
          display: "none",
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "8px",
          margin: "1rem 0",
          display: "block",
        }}
        alt="character"
      />
      <h1 ref={nameRef} />
      <p ref={speciesRef} style={{ color: "#666", marginBlock: "0.25rem" }} />

      {/* Status dropdwon */}
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Status</label>
          <select ref={statusRef}>
            <option value="want to watch">Want to watch</option>
            <option value="watching">Watching</option>
            <option value="watched">Watched</option>
          </select>
        </div>

        {/* Rating dropdown */}
        <div className="form-group">
          <label>Rating</label>
          <select ref={ratingRef}>
            <option value="">no rating</option>
            <option value="1">1⭐</option>
            <option value="2">2⭐⭐</option>
            <option value="3">3⭐⭐⭐</option>
            <option value="4">4⭐⭐⭐⭐</option>
            <option value="5">5⭐⭐⭐⭐⭐</option>
          </select>
        </div>

        {/* Comment box */}
        <div className="form-group">
          <label>Notes</label>
          <textarea ref={notesRef} rows="3" />
        </div>

        <p
          ref={successRef}
          style={{ display: "none", color: "green", marginBottom: "0.5rem" }}
        />
        <button type="submit" className="btn-primary">
          Update
        </button>
        <button type="button" className="btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </form>
    </div>
  );
}
