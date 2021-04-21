import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Note from './Note';
import services from '../services';
import NavBar from './Navbar';
import DropDownForm from './DropDownForm';

const List = (props) => (
  <div className={props.className}>
    <DropDownForm />
    {props.notes.map(note => 
      <Note 
        key={Math.random()}
        note={note}
        // id={note._id}
        // title={note.title}
        // sub={note.sub}
        // category={note.category}
        // content={note.content}
      />
    )}
  </div>
);

const ListContainer = styled(List)`
  grid-area: content / 2 / end / 8;
  position: relative;
  ${'' /* display: grid;
  grid-template-rows: repeat(auto-fill, minmax(200px, 1fr)); */}
`;

const UserNotesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: [start] auto [content] auto [end];
`;

export default function UserNotes() {
  const [notes, setNotes] = useState([[]]);
  const [newNote, setNewNote] = useState([]);

  function getUserNotes() {
    services.getAllNotes()
   .then(res => {
     setNotes(res.data);
   })
   .catch(err => {
     console.log(err)
   });
  }

  useEffect(() => {
    getUserNotes()
  }, []);

  return (
    <UserNotesContainer>
      <NavBar />
      <ListContainer
        className={ListContainer}
        notes={notes}
      />
    </UserNotesContainer>
  );
}