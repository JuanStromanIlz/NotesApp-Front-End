import { useEffect, useState } from 'react';
import styled from 'styled-components';
import services from '../services';
import ViewContainer from './Containers/ViewContainer';
import ContentContainer from './Containers/ContentContainer';
import Note from './Partials/Note';
import { EditNote } from './EditNote';
import Footer from './Partials/Footer';
import DropDownForm from './Partials/DropDownForm';
import { ProfileCard } from './Partials/ProfileCard';
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
  const [user, setUser] = useState({});
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  //Criterios de busqueda
  const [customSearch, setSearch] = useState('');
  const [filterCategories, setFilterCategories] = useState([]);
  const [noteEdit, setNoteEdit] = useState(null);
  
  //Trae los datos del usuario
  function getUser() {
    services.getUserInfo()
    .then(res => {
      setUser(res.data);
    })
    .catch(err => {
      console.log(err)
    });
  }
  //Trae las notas del usuario
  function getUserNotes() {
    services.getAllNotes()
   .then(res => {
     setNotes(res.data);
   })
   .catch(err => {
     console.log(err)
   });
  }
  //Trae las categorias del usuario
  function getUserCategories() {
    services.getCategories()
    .then(res => {
      setCategories(res.data);
    })
    .catch(err => {
      console.log(err)
    });
  }
  //Filtra las categorias del usuario
  function handleCategories(values) {
    setFilterCategories(values);
    setNoteEdit(null);
  }
  //Filtra las notas por un criterio de busqueda
  function handleSearch(value) {
    setSearch(value);
    setFilterCategories([]);
    setNoteEdit(null);
  }
  //Parametros para realizar la busqueda 
  function filterParams(note) {
    return note.title.match(new RegExp(customSearch, 'i')) ||
    note.sub.match(new RegExp(customSearch, 'i')) ||
    note.content.match(new RegExp(customSearch, 'i')) ||
    note.category.match(new RegExp(customSearch, 'i'))
  }
  //Elimina la nota seleccionada
  function handleDelete(id) {
    services.deleteNote(id);
  }
  //Selecciona la nota para editar
  function handleEdit(id) {
    setNoteEdit(id);
  }
  //Guarda los datos actualizados de una nota
  function submitEdit(values) {
    services.updateNote(values)
    .then(res =>{
      setNoteEdit(null);
    })
    .catch(err => {
      console.log(err)
    });
  }

  useEffect(() => {
    getUser();
    getUserNotes();
    getUserCategories();
  }, [notes]);

  return (
    <ViewContainer id='userNotes'>
      <Navbar user={user} categories={categories} setCategories={handleCategories} setNoteEdit={setNoteEdit} setSearch={handleSearch}  />
      <ContentContainer>
        <Actions>
          <ProfileCard user={user} />
          <Filter categories={categories} setCategories={handleCategories} setNoteEdit={setNoteEdit} setSearch={handleSearch} />
        </Actions>
        <ListContainer>
          <DropDownForm />
          {notes.length < 1 && 
            <StyledNoMatch 
            className={StyledNoMatch}
            setNotes={setNotes}
          />
          }
          { //Cuando ningun filtro esta activo
            filterCategories.length < 1 && customSearch.length === 0 ? 
              notes.filter(note => categories.includes(note.category)).map(note =>
              !(note._id === noteEdit) ?
                <Note 
                  key={note._id}
                  note={note}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                /> :
                <EditNote key={note._id} noteEdit={note} submitEdit={submitEdit}/> 
              ) :
              //Cuando la busqueda por categorias esta activa
              filterCategories.length >= 1 && customSearch.length === 0 ?
                notes.filter(note => filterCategories.includes(note.category)).map(note =>
                !(note._id === noteEdit) ?
                  <Note 
                    key={note._id}
                    note={note}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  /> :
                <EditNote key={note._id} noteEdit={note} submitEdit={submitEdit}/> 
              ) : 
              //Cuando la busqueda customizada esta activa
              filterCategories.length === 0 && customSearch.length >= 1 &&
                  notes.filter(filterParams).map(note =>
                  !(note._id === noteEdit) ?
                    <Note 
                      key={note._id}
                      note={note}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                    /> :
                  <EditNote key={note._id} noteEdit={note} submitEdit={submitEdit}/> 
                )
              }
        </ListContainer>
      </ContentContainer>
      <Footer />
    </ViewContainer>
  );
}
