import { useEffect, useState } from 'react';
import styled from 'styled-components';
import services from '../services';
import ViewContainer from './Containers/ViewContainer';
import ContentContainer from './Containers/ContentContainer';
import Note from './Partials/Note';
import Footer from './Partials/Footer';
import DropDownForm from './Partials/DropDownForm';
import Navbar from './Partials/Navbar';
import Filter from './Partials/Filter';

const NoMatch = (props) => {
  function cleanSearch() {
    services.getAllNotes()
    .then(res => {
      props.setNotes(res.data)
    })
    .catch(err => {
      console.log(err)
    });
  }
  return (
    <div className={props.className}>
      <button id='close-search' className='material-icons' onClick={() => cleanSearch() }>
        clear
      </button>
      <h2>Ups! No tenes notas</h2>     
      <div id='back-styled'>     
      <span className='material-icons'>
        sentiment_dissatisfied
      </span>
      </div>
    </div>
  );
}

const StyledNoMatch = styled(NoMatch)`
  position: relative;
  display: grid;
  grid-template-columns: 70%;
  place-items: center;
  padding: .8rem;
  min-height: 200px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 -1px rgba(0, 0, 0, 0.1) inset;
  border-radius: 10px;
  background: ${props => props.theme.colors.lila};
  #back-styled {
    position: absolute;
    top: 0; 
    bottom: 0;
    right: 0;
    left: 0;
    padding: .8rem;
    opacity: .5;
    display: grid;
    place-items: center end;
    span {
      font-size: 8em;
      margin:  0;
      vertical-aligment: middle;
    }
  }
  #close-search {
    position: absolute;
    z-index: 1;
    top: .8rem;
    right: .8rem;
  }
  button {
    border: none;
    background: transparent;
    padding: 0;
    width: fit-content;
    :hover {
      outline: none;
    }
    :focus {
      outline: none;
    }
  }
`;

const List = (props) => (
  <div className={props.className}>
    <DropDownForm />
    {props.notes.length < 1 && 
      <StyledNoMatch 
      className={StyledNoMatch}
      setNotes={props.setNotes}
    />
    }
    {props.notes.map(note => 
      <Note 
        key={Math.random()}
        note={note}
      />
    )}
  </div>
);

const ListContainer = styled(List)`
  grid-column: 3 / 7;
  border-left: 3px solid ${props => props.theme.colors.lila};
  border-right: 3px solid ${props => props.theme.colors.lila};
`;

const NoteActions = (props) => {
  return (
    <div className={props.className}>
      <Filter 
        setNotes={props.setNotes}
      />
    </div>
  );
}

const StyledActions = styled(NoteActions)`
  height: fit-content;
  position: sticky;
  top: 57px;
  grid-column: 1 / 3;
`;

const UserNotesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  @media (max-width: 800px) {
    ${ListContainer} {
      grid-column: 1 / 10;
    }
    ${StyledActions} {
      display: none;
    }
  }
  @media (max-width: 480px) {
    ${ListContainer} {
      grid-column: 1 / 10;
      border: none;
    }
    ${StyledActions} {
      display: none;
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
      <Navbar 
        setNotes={setNotes}
      />
      <ContentContainer>
        <StyledActions 
          className={StyledActions}
          setNotes={setNotes}
        />
        <ListContainer
          setNotes={setNotes}
          className={ListContainer}
          notes={notes}
        />
      </ContentContainer>
      <Footer />
    </ViewContainer>
  );
}