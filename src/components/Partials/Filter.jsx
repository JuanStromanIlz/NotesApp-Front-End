import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import services from '../../services';

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [isChecked, setChecked] = useState({});
  const categoryList = useRef(null);
  const categoryIcon = useRef(null);

  function checkboxList(array, state) {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item]: state,
      };
    }, initialValue);
  }

  function sendFilter() {
    //filtra todas las categorias, 
    //si luego de una seleccion ninguna queda en check se vuelven a traer todas las notas
    let selectedValues = Object.entries(isChecked);
    selectedValues = selectedValues.filter(([key, value]) => value === true);
    selectedValues = Object.fromEntries(selectedValues);
    selectedValues = Object.keys(selectedValues);
    if (selectedValues.length === 0) selectedValues = categories;
    services.getFilteredCategories(selectedValues)
    .then(res => {
      props.setNotes(res.data)
    })
    .catch(err => {
      console.log(err)
    });
  }

  function handleChange(e) {
    setChecked({ ...isChecked, [e.target.name]: e.target.checked });
  }

  function openCat() {
    categoryList.current.classList.toggle('open-cat');
    categoryIcon.current.classList.toggle('rotate');
  }

  function userCategories() {
    services.getCategories()
    .then(res => {
      setCategories(res.data)
      setChecked(checkboxList(res.data, false))
    })
    .catch(err => {
      console.log(err)
    });
  }
  
  useEffect(() => {
    userCategories()
  }, []);

  return (
    <div className={props.className}>
      <span className='title'>Categories &nbsp;</span>
      <button className='cat-title title' onClick={() => openCat()}>
        <span ref={categoryIcon} className='material-icons'>west</span>
      </button>
      <div  ref={categoryList} className='cate-list'>  
        <form onInput={sendFilter}>
          {categories.map(value => 
            <div
              key={value}
              className='category-input'
            >
              <span className='sub'>{value}</span>
              <input
                type="checkbox"
                name={value}
                checked={isChecked[value] || false}
                onChange={handleChange}
              />
            </div>
          )}
        </form> 
      </div>
    </div>
  );
}

const SearchBy = (props) => {
  const [input, setInput] = useState("");

  function handleChange(e) {
    let {value, name} = e.target;
    setInput(value)
  }

  function makeSearch(e) {
    e.preventDefault();
    services.getBySearch(input)
    .then(res => {
      props.setNotes(res.data)
    })
    .catch(err => {
      console.log(err)
    });
    if (window.innerWidth <= 480) {
      document.getElementById('userNotes').classList.toggle('view-fix');
      document.getElementById('sliceMenu').classList.toggle('slice');
    }
    setInput("");
  }

  return (
    <form className={props.className} onSubmit={makeSearch}>
      <input 
        className='sub'
        autoComplete='off'
        type='text'
        name='input'
        value={input}
        onChange={handleChange}
      />
      <button type='submit' className={`${input.length < 1 && 'disable' }`}>
        <span className='material-icons'>search</span>
      </button>
    </form>
  );
}

const StyledSearch = styled(SearchBy)`
  display: flex;
  flex-direction: row;
  margin: 0;
  width: 100%;
  input {
    margin: 0;
    width: 80%;
  }
  button {
    width: 20%;
  }
`;

const FilterContainer = styled.div`
  > * {
    width: 100%;
  }
  button {
    background: transparent;
    border: none;
    text-align: left;
    padding: 0;
    gap: .8rem;
    :hover {
      filter: brightness(120%);
    }
    :focus {
      outline: none;
    }
    .material-icons  {
      color: ${props => props.theme.colors.lila};
      display: inline-block;
      vertical-align: middle;
    }
  }
  > * {
    margin-bottom: .8rem;
  }
  .cate-list {
    height: 0;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .open-cat {
    height: auto;
  }
  .rotate {
    transform: rotate(-90deg);
  }
  .disable {
    opacity: .5;
    pointer-events: none;
  }
`;

export default function Filter(props) {

  return (
    <FilterContainer>
      <StyledSearch
        className={StyledSearch}
        setNotes={props.setNotes}
      />
      <Categories 
        setNotes={props.setNotes}
      />
    </FilterContainer>
  );
}