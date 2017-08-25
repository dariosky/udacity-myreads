import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import {BookLibrary} from './components/BookLibrary'
import BookSearch from './components/BookSearch'
import PageNotFound from './components/PageNotFound'
import Switch from 'react-router-dom/es/Switch'

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
    })
  }

  componentDidMount() {
    this._getBooks()
  }

  onMoveBook(book, shelf) {
    console.log(`Moving book ${book.title} to ${shelf}`)
    let existing = false
    const books = this.state.books.map(
      bookIterator => {
        if (bookIterator.id !== book.id)
        // keep the other books
          return bookIterator
        else {
          // keep the book, change the shelf
          existing = true // we had the book
          return {
            ...book,
            shelf: shelf,
          }
        }

      },
    )
    if (!existing)
      books.push({...book, shelf: shelf}) // a new book for our shelf
    BooksAPI.update(book, shelf)
    this.setState({
      books,
    })
  }

  render() {
    return (
      <div className="app">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Switch>
          <Route
            exact path="/"
            render={() =>
              <BookLibrary books={this.state.books}
                           onMoveBook={this.onMoveBook.bind(this)}/>
            }
          />
          <Route
            path="/search"
            render={() =>
              <BookSearch books={this.state.books}
                          onMoveBook={this.onMoveBook.bind(this)}/>
            }
          />
          <Route
            component={PageNotFound}
            />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
