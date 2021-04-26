import styled from 'styled-components';
import Filter from './Filter';

const SliceMenu = (props) => {

  return (
    <div  id={props.id} className={props.className}>
      <Filter 
        setNotes={props.setNotes}
      />
      <span className='title'>Logout</span>
    </div>
  );
};

const StyledSliceMenu = styled(SliceMenu)`
  background: white;
  position: absolute;
  top: 100%;
  width: 0vw;
  height: 100vh;
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
        <span className='material-icons title' onClick={() => props.openMenu()}>
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
  .title {
    font-size: 1.2rem;
  }
  .sub {
    font-size: 1rem;
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

export default function NavBar(props) {
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
        setNotes={props.setNotes}
      />
    </NavBarContainer>
  );
}