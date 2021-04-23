import styled from 'styled-components';
import services from '../services';
import Footer from './Footer';

const Home = (props) => (
  <div className={props.className}>
    <div>
      <h1>Cascada</h1>
      <a href='http://localhost:8080/facebook'>Log in</a>
    </div>
  </div>
);

const StyledHome = styled(Home)`
  height: 80%;
  display: grid;
  place-items: center;
`;

const StyledContainer = styled.div`
  min-height: 100vh; 
  margin: 0; 
  display: grid;
  grid-template-rows: 1fr auto;
`;

export default function HomeView() {
  return (
    <StyledContainer>
      <StyledHome 
        className={StyledHome}
      />
      <Footer />
    </StyledContainer>
  );
}