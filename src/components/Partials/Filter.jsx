import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Form } from './Form';
import { Button } from './Button';
import services from '../../services';

const StyledSearch = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: .8rem;
  header {
    display: flex;
    flex-flow: row nowrap;
  }
  .cate-input {
    display: flex;
    flex-row: row wrap;
    gap: .5rem;
    h3, input {
      margin: auto 0;
    }
  }
  h3 {
    margin: 0;
  }
`;

const Categories = ({categories, setCategories}) => {
  const [filterCategories, setFilterCategories] = useState([]);
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
    //filtra todas las categorias
    let selectedValues = Object.entries(isChecked);
    selectedValues = selectedValues.filter(([key, value]) => value === true);
    selectedValues = Object.fromEntries(selectedValues);
    selectedValues = Object.keys(selectedValues);
    setCategories(selectedValues)
  }

  function handleChange(e) {
    setChecked({ ...isChecked, [e.target.name]: e.target.checked });
  }

  function openCat() {
    categoryList.current.classList.toggle('open-cat');
    categoryIcon.current.classList.toggle('rotate');
  }

  useEffect(() => {
    setFilterCategories(categories);
    setChecked(checkboxList(categories, false));
  }, [filterCategories])

  return (
    <StyledSearch>
      <header id='cat-header'>
        <h3>Categorias &nbsp;</h3>
        <Button className='cat-title' onClick={() => openCat()}>
          <span ref={categoryIcon} className='material-icons'>west</span>
        </Button>
      </header>
      <div ref={categoryList} className='cate-list' >
        <Form onInput={sendFilter}>
          {categories.map(value => 
              <div key={value} className='cate-input'>
                <input 
                  type='checkbox' 
                  name={value} 
                  checked={isChecked[value] || false}
                  onChange={handleChange}
                />
                <h3>{value}</h3>
              </div>
          
          )}
        </Form> 
      </div>
    </StyledSearch>
  );
}

const StyledForm = styled(Form)`
  flex-flow: row nowrap;
`;

const SearchBy = ({setSearch}) => {
  const [input, setInput] = useState("");

  function handleChange(e) {
    let { value } = e.target;
    setInput(value)
  }

  function makeSearch(e) {
    e.preventDefault();
      setSearch(input)
    if (window.innerWidth <= 480) {
      document.getElementById('userNotes').classList.toggle('view-fix');
      document.getElementById('sliceMenu').classList.toggle('slice');
    }
    setInput("");
  }

  return (
    <StyledSearch>
      <h3>Buscar</h3>
      <StyledForm onSubmit={makeSearch}>
        <input 
          className='sub'
          autoComplete='off'
          type='text'
          name='input'
          value={input}
          onChange={handleChange}
        />
        <Button type='submit' className={`${input.length < 1 && 'disable' }`}>
          <span className='material-icons'>search</span>
        </Button>
      </StyledForm>
    </StyledSearch>
  );
}

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: .8rem;
  .cate-list {
    display: none;
  }
  .open-cat {
    display: block;
    ${Form} {
      display: flex;
      white-space: nowrap;
      flex-direction: column;
      justify-content: flex-start;
    }
  }
  .rotate {
    transform: rotate(-90deg);
  }
  .disable {
    opacity: .5;
    pointer-events: none;
  }
`;

export default function Filter({categories, setCategories, setSearch}) {

  return (
    <FilterContainer>
      <SearchBy
        setCategories={setCategories}
        setSearch={setSearch}
      />
      <Categories 
        categories={categories}
        setCategories={setCategories}
      />
    </FilterContainer>
  );
}