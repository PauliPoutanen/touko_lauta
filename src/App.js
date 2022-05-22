import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'


const App =() => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('') 
  const [showAll, setShowAll] = useState(true)

  console.log('App.js toimii')
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])


  

  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toLocaleDateString(),
      time: new Date().getHours(),
      min: new Date().getMinutes(),
      important: Math.random() > 0.5,
    }
  
    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange =(event) =>{
    event.preventDefault()
    console.log(event.target.value)
setNewNote(event.target.value)
  }
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

    const toggleImportanceOf = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
    
      noteService
      .update(id, changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
    }

return (
  <div>
    <h1>KEVAT//LAUTA</h1>
    <div>
        <button onClick={() => setShowAll(!showAll)}>
          Näytä {showAll ? 'vain tärkeät' : 'kaikki' }
        </button>
      </div>  
    <ul>
    {notesToShow.map(note => 
       <Note 
       key={note.id} note={note}
       toggleImportance={() => toggleImportanceOf(note.id)}
       />)}
    </ul>
    <form onSubmit={addNote}>
      <input 
      value={newNote}
      onChange={handleNoteChange}/>
      <button type="submit">Save</button>
    </form>
  </div>
)

}

export default App