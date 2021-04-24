import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Note from './Note';
import services from '../services';
import Footer from './Footer';
import DropDownForm from './DropDownForm';
import NavBar from './Navbar';

const List = (props) => (
  <div className={props.className}>
    <DropDownForm />
    {props.notes.map(note => 
      <Note 
        key={Math.random()}
        note={note}
      />
    )}
  </div>
);

const ListContainer = styled(List)`
  padding: 0 .8rem;
`;

const UserNotesContainer = styled.div`
  min-height: 100vh;
  margin: 0; 
  display: grid;
  grid-template-rows: auto 1fr auto;
  ${'' /* @media (max-width: 1500px) {
    ${ListContainer} {
      grid-column: 2 / 7;
    }
  }
  @media (max-width: 800px) {
    ${ListContainer} {
      grid-column: 2 / 10;
    }
  }
  @media (max-width: 480px) {
    ${ListContainer} {
      grid-column: 2 / 12;
    }
  } */}
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
    <UserNotesContainer id='userNotes'>
      <NavBar />
      <ListContainer
        className={ListContainer}
        notes={notes}
      />
      <Footer />
    </UserNotesContainer>
  );
}