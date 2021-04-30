import { useEffect, useState } from 'react';
import styled from 'styled-components';
import services from '../services';
import ViewContainer from './Containers/ViewContainer';
import ContentContainer from './Containers/ContentContainer';
import Note from './Partials/Note';
import Footer from './Partials/Footer';
import DropDownForm from './Partials/DropDownForm';
import { ProfileCard } from './Partials/ProfileCard';
import { CompleteNav } from './Partials/Navbar';
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

const ListContainer = styled.div`
  grid-column: 1 / 13;
  > * {
    margin-bottom: .8rem;
    :last-child {
      margin-bottom: 0;
    }
  }
  @media (min-width: 50rem) and (min-height: 32rem) {
    grid-column: 4 / 10;
  }
`;

const Actions = styled.div`
  display: none;
  @media (min-width: 50rem) and (min-height: 32rem) {
    display: block;
    grid-column: 1 / 4;
    height: fit-content;
    padding: .8rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 -1px rgba(0, 0, 0, 0.1) inset;
    background: ${props => props.theme.colors.white};
    border-radius: 10px;
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
      <CompleteNav notesLenght={notes.length} setNotes={setNotes} />
      <ContentContainer>
        <Actions>
          <ProfileCard />
          <Filter setNotes={setNotes} />
        </Actions>
        <ListContainer>
          <DropDownForm />
          {notes.length < 1 && 
            <StyledNoMatch 
            className={StyledNoMatch}
            setNotes={setNotes}
          />
          }
          {notes.map(note => 
            <Note 
              key={Math.random()}
              note={note}
            />
          )}
        </ListContainer>
      </ContentContainer>
      <Footer />
    </ViewContainer>
  );
}