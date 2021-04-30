import {useState, useEffect, useRef, cloneElement} from 'react';
import styled from 'styled-components';

export const Form = styled.form`
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
`;
export const ControlledForm = ({onSubmit, children, data}) => {
  const [formData, setForm] = useState({});
  let counter = 0;
  function handleChange(e) {
    e.preventDefault();
    let form = formData;
    form[e.target.name] = e.target.value;
    setForm({...form});
  }

  function sendForm(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  useEffect(() => {
    setForm(data)
  }, [data]);

  return(
    <Form onSubmit={(e) => sendForm(e)}>
    {children.map(item => {
      let valueInput = item.props.name;
      counter++;
      if (item.type === 'input' || item.type === 'textarea') {
        return cloneElement(item, {
          key: counter,
          value: formData[valueInput] || "",
          onChange: (e) => handleChange(e)
        });
      } 
      else {
        return cloneElement(item, {
          key: counter
        });
      } 
    })}
    </Form>
  );
}