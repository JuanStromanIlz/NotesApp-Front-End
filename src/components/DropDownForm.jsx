import { useState, useRef, forwardRef } from 'react';
import styled from 'styled-components';
import services from '../services';

const FormMenu = (props) => (
  <div className={props.className}>
    <h2>New Note</h2>
    <button onClick={props.dropMenu}>
      <span className='material-icons'>
        {props.openMenu ? 'clear' : 'add'}
      </span>
    </button>
  </div>
);

const StyledMenu = styled(FormMenu)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: .8rem 0;
  h2 {
    margin: auto auto auto 0;
  }
`;

const DropForm = forwardRef((props, ref) => (
  <form className={props.className} ref={ref} onSubmit={props.sendNote}>
    <input 
      type='text' 
      name='title' 
      placeholder='Title'
      autoComplete='off'
      value={props.newNote.title}
      onChange={(e) => props.handleChange(e)}
    />
    <input 
      type='text' 
      name='sub' 
      placeholder='Subtitle'
      autoComplete='off'
      value={props.newNote.sub}
      onChange={(e) => props.handleChange(e)}
    />
    <textarea 
      rows='5'
      name='content' 
      placeholder='Content'
      autoComplete='off'
      value={props.newNote.content}
      onChange={(e) => props.handleChange(e)}
    />
    <input 
      type='text' 
      name='category' 
      placeholder='Category'
      autoComplete='off'
      value={props.newNote.category}
      onChange={(e) => props.handleChange(e)}
    />
    <button type='submit'>Add Note</button>
  </form>
));

const StyledForm = styled(DropForm)`
  display: flex;
  flex-direction: column;
  margin: 0;
  gap: .8rem;
  width: 100%;
  max-height: 0;
  visibility: hidden;
  input {
    margin: 0;
  }
  textarea {
    resize: none;
  }
`;

const FormContainer = styled.div`
  max-height: fit-container;
  padding: .8rem .3rem 0 .3rem;
  button {
    border: none;
    border-radius: ${props => props.theme.button.borderRadius};
    background: ${props => props.theme.button.background};
    padding: ${props => props.theme.button.padding};
    width: fit-content;
    :hover {
      outline: none;
      background: ${props => props.theme.button.focusBackground};
    }
    :focus {
      outline: none;
    }
    span  {
      color: ${props => props.theme.colors.lila};
      display: inline-block;
      vertical-align: middle;
    }
  }
  .open-form {
    border-top: 1px solid ${props => props.theme.colors.lavanda};
    max-height: 225px;
    margin-bottom: .8rem;
    padding-top: .8rem;
    transition: max-height 0.25s ease-in;
    visibility: visible;
  }
`;

export default function DropDownForm() {
  const [newNote, setNewNote] = useState({});
  const dropedMenu = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  function handleChange(e) {
    let {value, name} = e.target;
    setNewNote(prevValues => {
      switch (name) {
        case 'title':
          return {
            title: value,
            sub: prevValues.sub,
            content: prevValues.content,
            category: prevValues.category
          }
          break;
        case 'sub':
          return {
            title: prevValues.title,
            sub: value,
            content: prevValues.content,
            category: prevValues.category
          }
          break;
        case 'content':
          return {
            title: prevValues.title,
            sub: prevValues.sub,
            content: value,
            category: prevValues.category
          }
          break;
        case 'category':
          return {
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

  function sendNote() {
    services.newNote(newNote)
    .then(res => {
      console.log(res)
    })
  }

  function dropMenu() {
    dropedMenu.current.classList.toggle('open-form');
    setOpenMenu(!openMenu);
  }

  return (
    <FormContainer>
      <StyledMenu 
        className={StyledMenu}
        openMenu={openMenu}
        dropMenu={dropMenu}
      />
      <StyledForm 
        ref={dropedMenu}
        className={StyledForm}
        newNote={newNote}
        handleChange={handleChange}
        sendNote={sendNote}
      />
    </FormContainer>
  );
}