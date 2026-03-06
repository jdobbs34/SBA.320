#  SBA 320H - React Web Application Project 

##  Rick and Morty Character Tracker
https://github.com/jdobbs34/SBA.320

## About

A React web application that lets you search for Rick and Morty characters, save them to your personal list, and track your watch status.

Link to live site = https://rickandmortycharactertracker.netlify.app/

## Technologies Used

- React 
- Vite
- React Router DOM
- CSS
- Rick and Morty API (https://rickandmortyapi.com)
- localStorage


## Approach
I built this app using React hooks to manage state and interact with the DOM:

- useState — Holds the characters array and is triggered when characters are added, edited, or deleted.
- useEffect — This is used for  Rick and Morty API search. When the user types, it auto-focuses the search input on the load page and connects to the characters array.
- useRef — Reads the input values on submit, and directly updates DOM elements on the edit page

The app has 4 pages connected with React Router. All character data is saved to localStorage so it continues after a page refresh.

## How to Run Locally
- bashgit clone https://github.com/jdobbs34/SBA.320
- cd to-repo-name
- npm install
- npm run dev
- Then open http://localhost:5173 in your browser

## Unsolved Problems
- No user authentication 

## Features
- Search Rick and Morty characters by name using the Rick and Morty API
- Save characters to a personal list
- Filter characters by status — Want to watch, watching, and watched
- Edit a character's status, rating, and notes
- Delete characters from your list
- View stats — total characters, watch counts, average rating
- Data persists in localStorage after page refresh
- Sticky navbar