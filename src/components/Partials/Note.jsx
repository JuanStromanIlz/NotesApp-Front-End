import styled from 'styled-components';
import { format, parseISO } from 'date-fns';
import Linkify from 'react-linkify';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import services from '../../services';

const Note = forwardRef((props, ref) => (
  <Linkify>
    <article ref={props.post} className={props.className}>
      <header>
        <div className='post-info'>
          <h3 className='post-title'>{props.title}</h3>
        </div>
        <div className='post-actions'>
          <Link to={`/edit/${props.id}`}>  
            <Button className='actions-big'>
              <span className='material-icons'>edit_note</span>
            </Button>
          </Link>
          <Button className='actions-big' onClick={() => props.deleteNote()}>
            <span className='material-icons'>delete_forever</span>
          </Button>
          <div ref={props.dropMenu} className='actions-small'> 
          {/* This display when viewport is less than 480px */}
            <Button onClick={() => props.openMenu()} onMouseLeave={() => props.openMenu()}>
              <span className='material-icons'>more_vert</span>
            </Button>
            <div className='actions-drop'>
              <Button onClick={() => props.updateNote(props.id)}>Edit note</Button>
              <Button onClick={() => props.deleteNote()}>Delete</Button>
            </div>
          </div>
        </div>
      </header> 
      {props.sub && <h4 className='post-sub'>{props.sub}</h4>}
      <div className='post-content'>
        <p>{props.content}</p>
      </div>  
      <footer className='category'>
        <span>{props.category}</span>
        <span>Created at {props.updatedAt}</span>
      </footer>
    </article>
  </Linkify>
));

const StyledNote = styled(Note)` 
  padding: 0 .8rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 -1px rgba(0, 0, 0, 0.1) inset;
  background: ${props => props.theme.colors.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: .3rem;
  header {
    padding-top: .8rem;
    display: flex;
    flex-direction: row;
    gap: .3rem;
    justify-content: space-between;
    .post-info {
      display: flex;
      flex-direction: column;
      gap: .3rem;
      > * {
        margin: 0;
      }
    }
    .post-actions {
      display: flex;
      flex-direction: row;
      gap: .8rem;
      margin: 0 0 auto auto;
    }
  }
  .post-sub {
    margin: 0;
  }
  .post-content {
    p {
      margin: 0;
    }
  }
  footer {
    padding-top: .3rem;
    padding-bottom: .8rem;
    border-top: 1px solid ${props => props.theme.colors.grey};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: .3rem;
    flex-wrap: wrap;
  }
  .actions-big {
    display: block;
  }
  .actions-small {
    display: none;
    position: relative;
    .actions-drop {
      white-space: nowrap;
      width: fit-content;
      display: flex;
      flex-direction: column;
      gap: .8rem;
      padding: .8rem;
      background: ${props => props.theme.colors.white};
      box-shadow: 0 1px 2px rgba(0,0,0,0.1), 0 -1px ${props => props.theme.colors.light} inset;
      border-radius: 10px;
      transform: scaleY(0);    
      transform-origin: top;
      transition: transform .1s ease;
      position: absolute;  
      top: 100%;
      right: 0;
      > button {
        text-align: left;
        font-size: 1rem;
        :hover {
          filter: brightness(120%);
        }
      }
    }
  }
`;

const NoteContainer = styled.div`
/* Note Animations */
  .delete-animation {
    transform: scaleY(0);
    filter: opacity(.7);
    transition: filter .3s ease-in, transform .5s ease-in;
  }
  .delete {
    display: none;
  }
  .open-menu {
    .actions-drop {
      transform: scaleY(1); 
      background: ${props => props.theme.colors.grey};
    }
  }
/* Note Animations */
  @media (max-width: 1500px) {
    .actions-big {
      display: block;
    }
    .actions-small {
      display: none;
    }
  }
  @media (max-width: 800px) {
    .actions-big {
      display: block;
    }
    .actions-small {
      display: none;
    }
  }
  @media (max-width: 480px) {
    .actions-big {
      display: none;
    }
    .actions-small {
      display: block;
    }
  }
`;

export default function NoteComponent(props) {
  const [dataNote, setData] = useState({});
  const dropMenu = useRef(null);
  const postRef = useRef(null);
  const dateToShow = format(parseISO(dataNote.updatedAt || '1998-12-04'), "eeee',' d LLL yyyy");

  function setNote(note) {
    setData(note)
  }

  function deleteNote() {
    postRef.current.classList.add('delete-animation');
    setTimeout(() => {
      postRef.current.classList.add('delete');
      services.deleteNote(dataNote._id)
    }, 680);
  }

  function updateNote(id) {

  }

  function openMenu() {
    dropMenu.current.classList.toggle('open-menu');
  }

  useEffect(() => {
    setNote(props.note)
  }, [props]);

  return (
    <NoteContainer>
      <StyledNote 
        post={postRef}
        dropMenu={dropMenu}
        className={StyledNote}
        deleteNote={deleteNote}
        updateNote={updateNote}
        openMenu={openMenu}
        id={dataNote._id}
        title={dataNote.title}
        sub={dataNote.sub}
        category={dataNote.category}
        content={dataNote.content}
        updatedAt={dateToShow}
      />
    </NoteContainer>
  );
}