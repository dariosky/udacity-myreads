import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import BookLibrary from './components/BookLibrary'
import BookSearch from './components/BookSearch'

class BooksApp extends React.Component {
  /* This is the BookApp - it manages the various book, and will keep the status */
  constructor() {
    super()
    this.state = {
      books: null, // we will load the books via the API
    }

  }

  _getBooks() {
    console.log("Getting book list")
    BooksAPI.getAll().then(books => {
      this.setState({books})
      console.log(`Got ${books.length} books`)
      console.log(books)
    })
  }

  componentWillMount() {
    this._getBooks()
  }


  render() {
    return (
      <div className="app">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <Route
          exact path="/"
          render={() =>
            <BookLibrary books={this.state.books}/>
          }
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
