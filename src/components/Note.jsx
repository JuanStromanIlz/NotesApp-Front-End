import styled from 'styled-components';
import Linkify from 'react-linkify';
import { useEffect, useState } from 'react';
import services from '../services';

const Note = (props) => (
  <div className={props.className}>
      <header>
        <input 
          type="text" 
          name="title" 
          className="note-title" 
          placeholder="Title" 
          value={props.title || "" } 
          onBlur={(e) => props.updateNote(e)}
          onChange={(e) => props.updateNote(e)}
        />
        <input 
          type="text" 
          name="sub" 
          className="note-sub" 
          placeholder="Subtitle" 
          value={props.sub || "" } 
          onBlur={(e) => props.updateNote(e)}
          onChange={(e) => props.updateNote(e)}
        />
        <input 
          type="text" 
          name="category" 
          className="note-category" 
          placeholder="Category" 
          value={props.category || "" } 
          onBlur={(e) => props.updateNote(e)}
          onChange={(e) => props.updateNote(e)}
        />
      </header>
      <div className="note-content">
        <Linkify>
          <input 
            type="text" 
            name="content" 
            className="note-content" 
            placeholder="Content" 
            value={props.content || "" } 
            onBlur={(e) => props.updateNote(e)}
            onChange={(e) => props.updateNote(e)}
          />
        </Linkify>
      </div>
  </div>
);

const StyledNote = styled(Note)`
  height: fit-content;
  display: flex;
  flex-direction: column;
`;

export default function NoteComponent(props) {
  const [dataNote, setData] = useState({});

  function setNote(note) {
    setData(note)
  }

  function updateNote(e) {
    let {value, name} = e.target;
    setData(prevValues => {
      switch (name) {
        case "title":
          return {
            _id: prevValues._id,
            writer: prevValues.writer,
            title:  value,
            sub: prevValues.sub,
            category: prevValues.category,
            content: prevValues.content
          }
          break;
        case "sub":
          return {
            _id: prevValues._id,
            writer: prevValues.writer,
            title:  prevValues.title,
            sub: value,
            category: prevValues.category,
            content: prevValues.content
          }
          break;
        case "category":
          return {
            _id: prevValues._id,
            writer: prevValues.writer,
            title:  prevValues.title,
            sub: prevValues.sub,
            category: value,
            content: prevValues.content
          }
          break;
        case "content":
          return {
            _id: prevValues._id,
            writer: prevValues.writer,
            title:  prevValues.title,
            sub: prevValues.sub,
            category: prevValues.category,
            content: value
          }
          break;
        default:
          break;
      }
    })
    services.updateNote(dataNote)
  }

  useEffect(() => {
    setNote(props.note)
  }, []);

  return (
    <StyledNote 
      className={StyledNote}
      updateNote={updateNote}
      id={dataNote.id}
      title={dataNote.title}
      sub={dataNote.sub}
      category={dataNote.category}
      content={dataNote.content}
      // createdAt={dataNote.createdAt}
    />
  );
}