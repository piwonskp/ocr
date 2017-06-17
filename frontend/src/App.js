import React, { Component } from 'react';
import { stack as Menu } from 'react-burger-menu'
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'
import lib from './lib.png'
import './App.css';
import UploadBook from './UploadBook/UploadBook'
import Home from './Home/Home'
import BookDetails from './BookDetails/BookDetails'

function MyNavLink(props) {
    return <NavLink {...props} className="menu-item" activeClassName="active"/>;
}


class App extends Component {
  constructor() {
    super();
    this.state = {'books': []};
    fetch('http://localhost:8000/list_books/', {
            method: 'GET',
        }).then(
            (response) => response.json().then(
                (json) => this.setState({books: json})
            )
    );
 }

 bookLink(book) {
     return <MyNavLink key={book.id} to={"/books/" + book.id}>{book.name}</MyNavLink>
 }

  render() {
    return (
    <Router>
      <div id="outer-container" className="App" style={{height: '100%'}}>
          <Menu outerContainerId={ "outer-container" } pageWrapId={ "page-wrap" }>
              <center><img alt="logo" className="App-logo" src={lib}/></center>
              <MyNavLink to="/">Home</MyNavLink>
              <MyNavLink to="/upload_book">Upload book</MyNavLink>
              <hr/>
              <h1 className="menu-header">Books</h1>
              {this.state.books.map(this.bookLink)}
          </Menu>
          <div id="page-wrap">
          <div className="App-header">
              <img alt="logo" className="App-logo" src={lib}/><h2 className="site-header">Library</h2>
          </div>
              <div id="content">
                  <Route exact path="/" component={Home}/>
                  <Route path="/upload_book" component={UploadBook}/>
                  <Route path="/books/:id" component={BookDetails}/>
              </div>
          </div>
      </div>
    </Router>
    );
  }
}

export default App;