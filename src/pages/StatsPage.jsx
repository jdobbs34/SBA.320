import { useNavigate } from "react-router-dom";

// Function for math
export default function StatsPage({characters}) {
  const navigate = useNavigate();

  const total = characters.length;
  const watched = characters.filter(c => c.status === "watched").length;
  const watching = characters.filter(c => c.status === "watching").length;
  const wantToWatch = characters.filter(c => c.status === "want to watch").length;
  const rated = characters.filter(c => c.rating)
  const avgRating = rated.length
  ?(rated.reduce((sum, c) => sum + c.rating, 0) / rated.length).toFixed(1)
  :'N/A'

  if (total === 0) {
    return (
      <div className="page" >
        <h1>Stats</h1>
        <p>No characters yet. <button className="btn-primary" onClick={() => navigate('/add')} >Add one</button></p>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>Stats</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{total}</h2>
          <p>Total Characters</p>
        </div>
        <div className="stat-card">
          <h2>{watched}</h2>
          <p>Watched</p>
        </div>
        <div className="stat-card">
          <h2>{watching}</h2>
          <p>Watching</p>
        </div>
        <div className="stat-card">
          <h2>{wantToWatch}</h2>
          <p>Want to Watch</p>
        </div>
        <div className="stat-card">
          <h2>{avgRating}</h2>
          <p>Avg Rating</p>
        </div>
      </div>

      <h2 style={{ marginBottom: '1rem' }} >Recently Added</h2>
      {characters.slice(0, 4).map(character => (
        <div key={character.id} className="book-card" >
          {character.image && <img src={character.image} alt={character.name} /> }
          <div>
              <h3>{character.name}</h3>
              <p>{character.species}</p>
              <p>{character.status}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
