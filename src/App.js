import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import BookLibrary from './components/BookLibrary'
import BookSearch from './components/BookSearch'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route
          exact path="/"
          component={BookLibrary}
        />
        <Route
          path="/search"
          component={BookSearch}
        />
      </div>
    )
  }
}

export default BooksApp
