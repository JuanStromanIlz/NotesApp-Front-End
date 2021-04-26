import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Note from './Note';
import services from '../services';
import Footer from './Footer';
import DropDownForm from './DropDownForm';
import NavBar from './Navbar';
import Filter from './Filter';
import ViewContainer from './ViewContainer';

const List = (props) => (
  <div className={props.className}>
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

const NoteActions = (props) => {
  return (
    <div className={props.className}>
      <DropDownForm />
      <Filter 
        setNotes={props.setNotes}
      />
    </div>
  );
}

const StyledActions = styled(NoteActions)`
  grid-column: 1 / 7;
`;

const UserNotesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  @media (max-width: 1500px) {
    ${ListContainer} {
      grid-column: 7 / 13;
    }
  }
  @media (max-width: 800px) {
    ${ListContainer} {
      grid-column: 1 / 10;
    }
  }
  @media (max-width: 480px) {
    ${ListContainer} {
      grid-column: 1 / 12;
    }
  }
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
    <ViewContainer id='userNotes'>
      <NavBar 
        setNotes={setNotes}
      />
      <UserNotesContainer>
        <StyledActions 
          className={StyledActions}
          setNotes={setNotes}
        />
        <ListContainer
          className={ListContainer}
          notes={notes}
        />
      </UserNotesContainer>
      <Footer />
    </ViewContainer>
  );
}