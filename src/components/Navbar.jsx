import { forwardRef, useRef } from 'react';
import styled from 'styled-components';

const arrayCat = ['Test', 'Juegos', 'Notas', 'Cosas', 'Categorias'];

const SliceMenu = forwardRef((props, ref) => (
  <div ref={ref} className={props.className}>
    <div>
      <h4>Categories</h4>
      <div id='cate-list'>
        {arrayCat.map(cat => 
          <li>{cat}</li>
        )}
      </div>
    </div>
    <h4>Logout</h4>
  </div>
));

const StyledSliceMenu = styled(SliceMenu)`
  position: absolute;
  top: 100%;
  width: 0vw;
  height: 90vh;
  background: white;
  transform-origin: left;
  transition: width .5s ease;
  display: flex; 
  flex-direction: column;
  #cate-list {
    height: 60%;
    white-space: nowrap;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
      <h1>Cascading Thoughts</h1>
      <button id='exit'>
        Exit
        <span className='material-icons' onClick={() => props.openMenu()}>
          logout
        </span>
      </button>
    </nav>
  );
}

const StyledNav = styled(Nav)`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1.3em;
  padding: .8rem;
  h1 {
    margin: 0;
  }
  #drop-menu {
    display: none;
  }
`;

const NavBarContainer = styled.div`
  position: sticky;
  z-index: 1;
  top: 0;
  button {
    background: transparent;
    border: none;
    text-align: left;
    font-size: 1rem;
    :hover {
      filter: brightness(120%);
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
    #drop-menu {
      display: block;
    }  
    #exit {
      display: none;
    }
  }
`;

export default function NavBar() {
  const sliceMenu = useRef(null);
  function openMenu() {
    sliceMenu.current.classList.toggle('slice');
  }

  return (
    <NavBarContainer>
      <StyledNav 
        className={StyledNav}
        openMenu={openMenu}
      />
      <StyledSliceMenu 
        ref={sliceMenu}
        className={StyledSliceMenu}
      />
    </NavBarContainer>
  );
}