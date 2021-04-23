import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Theme from './Theme';
import  Home from './components/Home';
import UserNotes from './components/UserNotes';
import NavBar from './components/Navbar';
import Footer from './components/Footer';

const StyledApp = styled.div`
  font-family: ${props => props.theme.fonts[0]};
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;  /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;
    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;
    /* Support for IE. */
    font-feature-settings: 'liga';
  }
`;

function App() {
  return (
    <Theme>
      <Router>
        <StyledApp>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/my-notes' component={UserNotes}/>
          </Switch>
        </StyledApp>
      </Router>
    </Theme>
  );
}

export default App;
