const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'ei-tärkeä' : 'tärkeä'

  return (
    <li>
      <b>{note.content}</b> <br></br>{} Julkaistu: {note.date} klo {note.time}:{note.min}
      <br></br><button onClick={toggleImportance}>{label}</button>
    </li>
  )
}
  
  export default Note