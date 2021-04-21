import styled from 'styled-components';
import Linkify from 'react-linkify';
import { forwardRef, useEffect, useRef, useState } from 'react';
import services from '../services';

const Note = forwardRef((props, ref) => (
  <Linkify>
    <article className={props.className}>
      <header>
        <div className='post-info'>
          <h3 className='post-title'>{props.title}</h3>
        </div>
        <div className='post-actions'>
          <button className='actions-big' onClick={() => props.deleteNote()}>
            <span className='material-icons'>edit_note</span>
          </button>
          <button className='actions-big' onClick={() => props.deleteNote()}>
            <span className='material-icons'>delete_forever</span>
          </button>
          <div ref={ref} className='actions-small'> {/* This display when viewport is less than 480px */}
            <button onClick={() => props.openMenu()} onMouseLeave={() => props.openMenu()}>
              <span className='material-icons'>more_vert</span>
            </button>
            <div className='actions-drop'>
              <div>
                <h4>Edit note</h4>
                <button onClick={() => props.deleteNote()}>
                  <span className='material-icons'>edit_note</span>
                </button>
              </div>
              <div>
                <h4>Delete</h4>
                <button onClick={() => props.deleteNote()}>
                  <span className='material-icons'>delete_forever</span>
                </button>
              </div>
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
      </footer>
    </article>
  </Linkify>
));

const StyledNote = styled(Note)` 
  padding: .8rem .3rem;
  border-top: 1px solid ${props => props.theme.colors.lavanda};
  border-bottom: 1px solid ${props => props.theme.colors.lavanda};
  display: flex;
  flex-direction: column;
  gap: .3rem;
  header {
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
      button {
        border: none;
        border-radius: ${props => props.theme.button.borderRadius};
        background: transparent;
        padding: 0;
        :hover {
          span {
            filter: brightness(120%);
          }
        }
        :focus {
          outline: none;
          span {
            filter: brightness(120%);
          }
        }
        span  {
          color: ${props => props.theme.colors.lila};
          display: inline-block;
          vertical-align: middle;
        }
      }
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
    ${'' /* padding: .3rem 0; */}
  }
  .actions-big {
    display: block;
  }
  .actions-small {
    display: none;
    position: relative;
    .actions-drop {
      width: fit-content;
      display: flex;
      flex-direction: column;
      gap: .3rem;
      padding: .5rem .3rem;
      background: white;
      transform: scaleY(0);    
      transform-origin: top;
      transition: transform .1s ease;
      position: absolute;  
      top: 100%;
      right: 0;
      div {
        white-space: nowrap;
        z-index: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: .3rem;
        h4 {
          margin: 0;
        }
      }
    }
  }
  .open-menu {
    .actions-drop {
      transform: scaleY(1); 
    }
  }
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
  const menuRef = useRef(null);

  function setNote(note) {
    setData(note)
  }

  function deleteNote() {
    services.deleteNote(dataNote._id)
  }

  function updateNote() {
    console.log(dataNote._id)
  }

  function openMenu() {
    menuRef.current.classList.toggle('open-menu');
  }

  useEffect(() => {
    setNote(props.note)
  }, []);

  return (
    <StyledNote 
      ref={menuRef}
      className={StyledNote}
      updateNote={updateNote}
      deleteNote={deleteNote}
      openMenu={openMenu}
      id={dataNote.id}
      title={dataNote.title}
      sub={dataNote.sub}
      category={dataNote.category}
      content={dataNote.content}
      // createdAt={dataNote.createdAt}
    />
  );
}