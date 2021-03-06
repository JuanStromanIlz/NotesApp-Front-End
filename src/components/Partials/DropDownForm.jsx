import { useState, useRef, forwardRef } from 'react';
import { Form } from './Form';
import { Button } from './Button';
import { ValidationForm } from './ValidateForm';
import styled from 'styled-components';
import services from '../../services';

const FormMenu = (props) => (
  <div className={props.className}>
    <h3>New Note</h3>
    <Button onClick={props.dropMenu}>
      <span className='material-icons'>
        {props.openMenu ? 'clear' : 'add'}
      </span>
    </Button>
  </div>
);

const StyledMenu = styled(FormMenu)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  h3 {
    margin: auto auto auto 0;
  }
`;

const StyledForm = styled(ValidationForm)`
  max-height: 0;
  visibility: hidden;
`;

const FormContainer = styled.div`
  max-height: fit-container;
  padding: .8rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 -1px rgba(0, 0, 0, 0.1) inset;
  background: ${props => props.theme.colors.white};
  border-radius: 10px;
  .open-form {
    border-top: 1px solid ${props => props.theme.colors.grey};
    max-height: fit-content;
    padding-top: .8rem;
    margin-top: .8rem;
    transition: max-height 0.25s ease-in;
    visibility: visible;
  }
`;

export default function DropDownForm() {
  // const [newNote, setNewNote] = useState({});
  const dropedMenu = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  // function handleChange(e) {
  //   e.preventDefault();
  //   let form = newNote;
  //   form[e.target.name] = e.target.value;
  //   setNewNote({...form});
  // }

  function sendNote(values) {
    // e.preventDefault();
    services.newNote(values)
    .then(() => {
      dropMenu()
    });
  }

  function dropMenu() {
    dropedMenu.current.classList.toggle('open-form');
    // document.getElementById('title').focus();
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
        sendForm={sendNote}
      />
    </FormContainer>
  );
}