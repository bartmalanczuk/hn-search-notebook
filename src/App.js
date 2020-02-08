import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import './App.css';

import SearchNotebooksView from 'components/SearchNotebooksView';
import SearchResultsView from 'components/SearchResultsView';

const useStyles = makeStyles(theme => ({
  menuItem: {
    marginLeft: theme.spacing(2),
  },
}));

function App() {
  const styles = useStyles();

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h1" variant="h6">
            HN Search Notebook
          </Typography>
          <Link component={RouterLink} to='/' color="inherit" className={styles.menuItem}>
            Home
          </Link>
          <Link component={RouterLink} to='/notebooks' color="inherit" className={styles.menuItem}>
            Notebooks
          </Link>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path='/notebooks'>
          <SearchNotebooksView />
        </Route>
        <Route path='/'>
          <SearchResultsView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
