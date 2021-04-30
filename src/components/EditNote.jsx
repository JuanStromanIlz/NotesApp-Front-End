import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import ViewContainer from './Containers/ViewContainer';
import ContentContainer from './Containers/ContentContainer';
import { Nav } from './Partials/Navbar';
import { Form } from './Partials/Form';
import Footer from './Partials/Footer';
import services from '../services';

const StyledEdit = styled.div`
  grid-column: 1 / 4;
`;

export default function EditNote(props) {
  const [note, setNote] = useState({});
  const { match: { params } } = props;
  const dateToShow = format(parseISO(note.updatedAt || '1998-12-04'), "eeee',' d LLL yyyy");
  const history = useHistory();

  function handleChange(e) {
    e.preventDefault();
    let form = note;
    form[e.target.name] = e.target.value;
    setNote({...form});
  }

  function saveNote() {
    services.updateNote(note)
    .then(res =>{
      console.log("listo")
    })
    .catch(err => {
      console.log(err)
    });
  }

  function getDataNote(id) {
    services.getNote(id)
    .then(res => {
    setNote(res.data)
    })
    .catch(err => {
      console.log(err)
    });
  }

  useEffect(() => {
    getDataNote(params.id)
  }, []);

  return (
    <ViewContainer>
      <Nav>
        <h1 id='app-title'>Cascading Thoughts</h1>
      </Nav>
      <ContentContainer>
        <StyledEdit>
          <Form onSubmit={saveNote}>
            <input 
              type='text' 
              name='title' 
              placeholder='Title'
              autoComplete='off'
              value={note.title}
              onChange={(e) => handleChange(e)}
            />
            <input 
              type='text' 
              name='sub' 
              placeholder='Subtitle'
              autoComplete='off'
              value={note.sub}
              onChange={(e) => handleChange(e)}
            />
            <textarea 
              rows='10'
              name='content' 
              placeholder='Content'
              autoComplete='off'
              value={note.content}
              onChange={(e) => handleChange(e)}
            />
            <input 
              type='text' 
              name='category' 
              placeholder='Category'
              autoComplete='off'
              value={note.category}
              onChange={(e) => handleChange(e)}
            />
            <button type='submit'>Guardar</button>
          </Form>
          <span>Ultima edicion {dateToShow}</span>
        </StyledEdit>
      </ContentContainer>
      <Footer />
    </ViewContainer>
  );
}