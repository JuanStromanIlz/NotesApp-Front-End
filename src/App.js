import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import  Home from './components/Home';
import UserNotes from './components/UserNotes';

const StyledApp = styled.div`
  
`;

function App() {
  return (
    <Router>
      <StyledApp>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/my-notes' component={UserNotes}/>
        </Switch>
      </StyledApp>
    </Router>
  );
}

export default App;
