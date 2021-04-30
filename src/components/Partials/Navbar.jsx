import styled from 'styled-components';
import { Button } from './Button';
import Filter from './Filter';
import { ProfileCard } from './ProfileCard';

const SliceMenu = styled.div`
  position: absolute;
  top: 100%;
  width: 0vw;
  height: 100vh;
  transform-origin: left;
  transition: width .5s ease;
  background: ${props => props.theme.colors.white};
  display: flex; 
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
  white-space: nowrap;
  > * {
    margin: .8rem .8rem 0 .8rem;
  }
  @media (min-width: 50rem) and (min-height: 32rem) {
    display: none;
  }
`;

export const Nav = styled.nav`
  background: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.white};
  position: relative;
  top: 0;
  display: flex;
  flex-flow: row wrap;
  gap: .8rem;
  padding: .8rem;
  #app-title {
    margin: 0 auto;
  }
  @media (min-width: 50rem) and (min-height: 32rem) {
    #drop-menu {
      display: none;
    }
  }
`;

const NavBarContainer = styled.div`
  position: sticky;
  z-index: 1;
  top: 0;
  .slice {
    width: 100vw;
  }
`;

export const CompleteNav = ({setNotes}) => {
  function openMenu() {
    document.getElementById('userNotes').classList.toggle('view-fix');
    document.getElementById('sliceMenu').classList.toggle('slice');
  }
  
  return (
    <NavBarContainer>
      <Nav>
        <Button id='drop-menu'>
          <span className='material-icons' onClick={() => openMenu()}>
            menu
          </span>
        </Button>
        <h1 id='app-title'>Cascading Thoughts</h1>
      </Nav>
      <SliceMenu id='sliceMenu'>
        <ProfileCard />
        <Filter setNotes={setNotes} />
      </SliceMenu>
    </NavBarContainer>
  );
}