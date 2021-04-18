import styled from 'styled-components';
import services from '../services';

const Home = (props) => (
  <div className={props.className}>
    <div className="content">
      <h1>Cascada</h1>
      <a href="http://localhost:8080/facebook">Log in</a>
      <button onClick={() => services.logOut()}>Log Out</button>
    </div>
    <footer>
      <a href="https://github.com/JuanStromanIlz">https://github.com/JuanStromanIlz</a>
      <p>2021 Juan Stroman Ilz&emsp;&copy;</p>
    </footer>
  </div>
);

const StyledHome = styled(Home)`
  height: 100vh;
  display: grid;
  grid-template-rows: [content-start] auto [content-end] 20% [footer-end];
  place-items: center;
  .content {
    grid-row: content-start / content-end;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
  footer {
    grid-row: content-end / footer-end;
    text-align: center;
    p {
      margin: 0;
    }
  }
`;

export default function HomeView() {
  return (
    <StyledHome 
      className={StyledHome}
    />
  );
}