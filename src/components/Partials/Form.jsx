import {useState, useEffect, useRef, cloneElement} from 'react';
import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0;
  gap: .8rem;
  input[type='text'], textarea {
    appeareance: none; 
    resize: none;
    box-sizing:border-box;
    border: 1px solid ${props => props.theme.colors.grey};
    margin: 0;
    padding: .4rem;
    border-radius: 10px;
    width: 100%;
    position:relative;
    z-index:0;
    :hover, :focus {
      outline: none;
      border-color: ${props => props.theme.colors.selected};
      cursor: text;               
      box-shadow: 0 0 5px ${props => props.theme.colors.selected};
    }
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