import styled from 'styled-components';

const Nav = (props) => {
  function dropMenu() {
    
  }
  return (
    <nav className={props.className}>
      <button>
        <span className="material-icons" onClick={() => props.openMenu()}>
          menu
        </span>
      </button>
      <h1>Cascading Thoughts</h1>
      <ul>
        <li 
          class="has-drop"
          onClick={() => dropMenu}
        >
          Categories
          <ul class="list-drop">
            <li>
              <a href="#!">
                Item 1
              </a>
            </li>
            <li>
              <a href="#!">
                Item 2
              </a>
            </li>
          </ul>
        </li>
        <li><a>Log out</a></li>
      </ul>
    </nav>
  );
}

const StyledNav = styled(Nav)`
  grid-area: 1 / 1 / 2 / end;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1.3em;
  position: sticky;
  padding: .8rem;
  h1 {
    margin: 0;
  }
  ul {
    margin: auto 0;
    padding: 0;
    display: inline-block;
    display: flex;
    flex-direction: row;
    list-style-type:none;
    li {
      display: inline-block;
      margin-right: 30px;
    } 
  }
  .has-drop {
    position: relative;
    :hover {
      .list-drop {
        visibility: visible;
      }
    }
  }
  .list-drop {
    visibility: hidden;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    position: absolute;
    top: 100%;
  }
  button {
    display: none;
    visibility: hidden;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    line-height: 1.5rem;
  }
`;

export default function NavBar() {
  return (
    <StyledNav 
      className={StyledNav}
    />
  );
}