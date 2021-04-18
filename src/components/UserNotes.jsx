import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Note from './Note';
import services from '../services';

const List = (props) => (
  <div className={props.className}>
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
  grid-column: 2 / 10;
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
`;

const UserNotesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

export default function UserNotes() {
  const [notes, setNotes] = useState([[]]);

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
      <ListContainer
        className={ListContainer}
        notes={notes}
      />
    </UserNotesContainer>
  );
}