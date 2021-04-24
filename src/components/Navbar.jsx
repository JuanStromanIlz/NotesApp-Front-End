import styled from 'styled-components';

const arrayCat = ['Test', 'Juegos', 'Notas', 'Cosas', 'Categorias', 'Test', 'Juegos', 'Notas', 'Cosas', 'Categorias', 'Test', 'Juegos', 'Notas', 'Cosas', 'Categorias', 'Test', 'Juegos', 'Notas', 'Cosas', 'Categorias', 'Test', 'Juegos', 'Notas', 'Cosas', 'Categorias', 'Test', 'Juegos', 'Notas', 'Cosas', 'Categorias'];

const SliceMenu = (props) => {
  function openCat() {
    document.getElementById('slicedCat').classList.toggle('open-cat');
    document.getElementById('icon-rotate').classList.toggle('rotate');
  }

  return (
    <div  id={props.id} className={props.className}>
      <div>
        <button className='cat-title' onClick={() => openCat()}>
          <span>Categories &nbsp;</span>
          <span id='icon-rotate' className='material-icons'>west</span>
        </button>
        <div id='slicedCat' className='cate-list'>
          {arrayCat.map(cat => 
            <button>{cat}</button>
          )}
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
background: white;
  position: relative;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1.3em;
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
    #drop-menu {
      display: block;
    }  
    #exit {
      display: none;
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