import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, browserHistory} from 'react-router';

import GitGrep from './components/GitGrep.js';
import GitSearch from './components/GitSearch.js';

var RouteHandler = Router.RouteHandler;
let App = ({children}) =>
  <div className="container-fluid theme-showcase">
    <nav className="navbar navbar-inverse">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">GIT</Link>
        </div>
        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li><Link to="/gitgrep">Grep</Link></li>
            <li><Link to="/gitsearch">Search</Link></li>
          </ul>
        </div>
      </div>
    </nav>
    {children}
  </div>;

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="gitgrep" component={GitGrep}/>
      <Route path="gitsearch" component={GitSearch}/>
    </Route>
  </Router>
), document.getElementById('bundle'));

