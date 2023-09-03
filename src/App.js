import { Route, Router } from 'react-router-dom';
import './App.css';
import AppBar from './components/Appbar';
import Item from './components/Item';
import UpdateItem from './components/UpdateItem';
import { Switch } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <AppBar/>
      <Item/>
    </div>
    
    /*<>
      <Router>
        <Switch>
          <Route exact path='/item/add' Component={AppBar} />
          <Route exact path='/item/add' Component={Item} />
          <Route exact path='/item/update/:id' Component={UpdateItem} />
        </Switch>
      </Router>
    </>*/
  );
}

export default App;
