import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';
import ViewContainer from './Containers/ViewContainer';
import ContentContainer from './Containers/ContentContainer';
import PlainNavbar from './Partials/PlainNavbar';
import Footer from './Partials/Footer';
import services from '../services';

const Edit = (props) => (
  <div className={props.className}>
    <form onSubmit={(e) => props.saveNote(e)}>
      <input 
        type='text' 
        name='title' 
        placeholder='Title'
        autoComplete='off'
        value={props.note.title || ""}
        onChange={(e) => props.handleChange(e)}
      />
      <input 
        type='text' 
        name='sub' 
        placeholder='Subtitle'
        autoComplete='off'
        value={props.note.sub || ""}
        onChange={(e) => props.handleChange(e)}
      />
      <textarea 
        rows='10'
        name='content' 
        placeholder='Content'
        autoComplete='off'
        value={props.note.content || ""}
        onChange={(e) => props.handleChange(e)}
      />
      <input 
        type='text' 
        name='category' 
        placeholder='Category'
        autoComplete='off'
        value={props.note.category || ""}
        onChange={(e) => props.handleChange(e)}
      />
      <button type='submit'>Guardar</button>
    </form>
    <span>Ultima edicion {props.dateToShow}</span>
  </div>
);

const StyledEdit = styled(Edit)`
  grid-column: 1 / 4;
  form {
    display: flex;
    flex-direction: column;
    margin: 0;
    gap: .8rem;
    input {
      margin: 0;
    }
    textarea {
      resize: none;
    }
  }
`;

export default function EditNote(props) {
  const [note, setNote] = useState({});
  const { match: { params } } = props;
  const dateToShow = format(parseISO(note.updatedAt || '1998-12-04'), "eeee',' d LLL yyyy");
  const history = useHistory();

  function saveNote(e) {
    e.preventDefault()
    services.updateNote(note)
    .then(res =>{
      history.push("/my-notes");
    })
    .catch(err => {
      console.log(err)
    });
  }

  function handleChange(e) {
    let {value, name} = e.target;
    setNote(prevValues => {
      switch (name) {
        case 'title':
          return {
            _id: prevValues._id,
            updatedAt: prevValues.updatedAt,
            title: value,
            sub: prevValues.sub,
            content: prevValues.content,
            category: prevValues.category
          }
          break;
        case 'sub':
          return {
            _id: prevValues._id,
            updatedAt: prevValues.updatedAt,
            title: prevValues.title,
            sub: value,
            content: prevValues.content,
            category: prevValues.category
          }
          break;
        case 'content':
          return {
            _id: prevValues._id,
            updatedAt: prevValues.updatedAt,
            title: prevValues.title,
            sub: prevValues.sub,
            content: value,
            category: prevValues.category
          }
          break;
        case 'category':
          return {
            _id: prevValues._id,
            updatedAt: prevValues.updatedAt,
            title: prevValues.title,
            sub: prevValues.sub,
            content: prevValues.content,
            category: value
          }
          break;
        default:
          break;
      }
    });
  }

  useEffect(() => {
    services.getNote(params.id)
    .then(res => {
    setNote(res.data)
    })
    .catch(err => {
      console.log(err)
    });
  }, []);

  return (
    <ViewContainer>
      <PlainNavbar />
      <ContentContainer>
        <StyledEdit 
          note={note}
          handleChange={handleChange}
          saveNote={saveNote}
          dateToShow={dateToShow}
        />
      </ContentContainer>
      <Footer />
    </ViewContainer>
  );
}