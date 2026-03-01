import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
     <span>🛸 Rick and Morty Tracker</span>
      <div>
        <NavLink to='/'>My Characters</NavLink>
        <NavLink to='/add'>Add Character</NavLink>
        <NavLink to='/stats'>Stats</NavLink>
      </div>
    </nav>
  )
}


