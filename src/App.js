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

  onMoveBook(book, shelf) {
    console.log(`Moving book ${book.title} to ${shelf}`)
    const books = this.state.books.map(
      bookIterator => {
        if (bookIterator.id !== book.id)
        // keep the other books
          return bookIterator
        else {
          // keep the book, change the shelf
          return {
            ...book,
            shelf: shelf,
          }
        }

      },
    )
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

        <Route
          exact path="/"
          render={() =>
            <BookLibrary books={this.state.books}
                         onMoveBook={this.onMoveBook.bind(this)}/>
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
