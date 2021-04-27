import styled from 'styled-components';

const Nav = (props) => (
  <nav className={props.className}>
    <h1 id='app-title'>Cascading Thoughts</h1>
  </nav>
);

const StyledNav = styled(Nav)`
  position: sticky;
  z-index: 1;
  top: 0;
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: .8rem;
  #app-title {
    margin: 0;
  }
`;

export default function PlainNavbar(props) {
  return (
    <StyledNav 
      className={StyledNav}
    />
  );
}