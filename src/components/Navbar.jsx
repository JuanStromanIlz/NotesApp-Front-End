import { useEffect, useState } from 'react';
import styled from 'styled-components';
import services from '../services';

const SliceMenu = (props) => {
  const [categories, setCategories] = useState([]);

  function userCategories() {
    services.getCategories()
    .then(res => {
      setCategories(res.data)
    })
    .catch(err => {
      console.log(err)
    });
  }
  function openCat() {
    document.getElementById('slicedCat').classList.toggle('open-cat');
    document.getElementById('icon-rotate').classList.toggle('rotate');
  }

  useEffect(() => {
    userCategories()
  }, []);

  return (
    <div  id={props.id} className={props.className}>
      <div>
        <button className='cat-title' onClick={() => openCat()}>
          <span>Categories &nbsp;</span>
          <span id='icon-rotate' className='material-icons'>west</span>
        </button>
        <div id='slicedCat' className='cate-list'>
          <form>
            {categories.map(value => 
              <div
                key={value}
                className='category-input'
              >
                <span>{value}</span>
                <input
                  onChange={() => console.log(value)} 
                  type="checkbox" 
                  name={value}
                />
              </div>
            )}
          </form>
        </div>
      </div>
      <h4>Logout</h4>
    </div>
  );
};

const StyledSliceMenu = styled(SliceMenu)`
  background: white;
  position: absolute;
  top: 100%;
  width: 0vw;
  height: 90vh;
  transform-origin: left;
  transition: width .5s ease;
  display: flex; 
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
  white-space: nowrap;
  > * {
    margin-left: .8rem;
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
`;

const Nav = (props) => {
  function dropMenu() {
    props.openMenu()
  }
  return (
    <nav className={props.className}>
      <button id='drop-menu'>
        <span className='material-icons' onClick={() => dropMenu()}>
          menu
        </span>
      </button>
      <h1 id='app-title'>Cascading Thoughts</h1>
      <button id='exit'>
        <span className='material-icons' onClick={() => props.openMenu()}>
          logout
        </span>
      </button>
    </nav>
  );
}

const StyledNav = styled(Nav)`
  background: white;
  position: relative;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1.3em;
  #app-title {
    margin: 0;
  }
  #drop-menu {
    display: none;
  }
  #exit {
    display: block;
    position: absolute;
    top: .8rem;
    right: .8rem;
    bottom: .8rem;
  }
`;

const NavBarContainer = styled.div`
  position: sticky;
  z-index: 1;
  top: 0;
  > :first-child {
    padding: .8rem;
  }
  display: grid;
  grid-template-rows: auto 1fr;
  button {
    background: transparent;
    border: none;
    text-align: left;
    font-size: 1rem;
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
  .slice {
    width: 100vw;
  }
  
  @media (max-width: 1500px) {
    #drop-menu {
      display: none;
    }  
  }
  @media (max-width: 800px) {
    #drop-menu {
      display: none;
    } 
  }
  @media (max-width: 480px) {
    ${StyledNav} {
      justify-content: center;
      #drop-menu {
        display: block;
        position: absolute;
        top: .8rem;
        left: .8rem;
        bottom: .8rem;
      }  
      #exit {
        display: none;
      }
    }
  }
`;

export default function NavBar() {
  function openMenu() {
    document.getElementById('userNotes').classList.toggle('view-fix');
    document.getElementById('sliceMenu').classList.toggle('slice');
  }
  
  return (
    <NavBarContainer>
      <StyledNav 
        className={StyledNav}
        openMenu={openMenu}
      />
      <StyledSliceMenu 
        id='sliceMenu'
        className={StyledSliceMenu}
      />
    </NavBarContainer>
  );
}