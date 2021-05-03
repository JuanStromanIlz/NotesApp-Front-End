import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import { Form } from './Partials/Form';
import { Button } from './Partials/Button';
import services from '../services';

const StyledEdit = styled.div`
  grid-column: 1 / 13;
  padding: .8rem;
  background: ${props => props.theme.colors.white};
  box-shadow: 0 1px 2px rgba(0,0,0,0.1), 0 -1px ${props => props.theme.colors.light} inset;
  border-radius: 10px;
  @media (min-width: 50rem) and (min-height: 32rem) {
    grid-column: 4 / 10;
  }
`;

export default function EditNote({noteEdit, setNoteEdit}) {
  const [note, setNote] = useState({});
  const dateToShow = format(parseISO(note.updatedAt || '1998-12-04'), "eeee',' d LLL yyyy");

  function handleChange(e) {
    e.preventDefault();
    let form = note;
    form[e.target.name] = e.target.value;
    setNote({...form});
  }

  function saveNote() {
    // e.preventDefault();
    services.updateNote(note)
    .then(res =>{
      setNoteEdit(null);
    })
    .catch(err => {
      console.log(err)
    });
  }

  useEffect(() => {
    setNote(noteEdit)
  }, []);

  return (
    <StyledEdit>
      <Form onSubmit={saveNote}>
        <span>Ultima edicion {dateToShow}</span>
        <input 
          type='text' 
          name='title' 
          placeholder='Title'
          autoComplete='off'
          value={note.title || ''}
          onChange={(e) => handleChange(e)}
        />
        <input 
          type='text' 
          name='sub' 
          placeholder='Subtitle'
          autoComplete='off'
          value={note.sub || ''}
          onChange={(e) => handleChange(e)}
        />
        <textarea 
          rows='10'
          name='content' 
          placeholder='Content'
          autoComplete='off'
          value={note.content || ''}
          onChange={(e) => handleChange(e)}
        />
        <input 
          type='text' 
          name='category' 
          placeholder='Category'
          autoComplete='off'
          value={note.category || ''}
          onChange={(e) => handleChange(e)}
        />
        <Button withText type='submit'>Guardar</Button>
      </Form>
    </StyledEdit>
  );
}