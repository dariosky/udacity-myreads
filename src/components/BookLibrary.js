import React from 'react'
import {Link} from 'react-router-dom'

import PropTypes from 'prop-types'

// Let's define the available Shelves
const availableShelves = [
  {name: 'Currently Reading', id: 'currentlyReading'},
  {name: 'Want to Read', id: 'wantToRead'},
  {name: 'Read', id: 'read'},
  {name: 'None', id: 'none', dontList: true},
]

class BookShelfChanger extends React.Component {
  static propTypes = {
    current: PropTypes.string.isRequired,
  }

  render() {
    return <div className="book-shelf-changer">
      <select defaultValue={this.props.current}>
        <option value="none" disabled>Move to...</option>
        {availableShelves.map(
          shelfDescription => {
            return <option key={shelfDescription.id}
                           value={shelfDescription.id}>{shelfDescription.name}</option>
          },
        )}
      </select>
    </div>
  }
}

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object,
  }

  render() {
    const book = this.props.book

    return <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            backgroundImage: `url(${book.imageLinks.thumbnail})`,
          }}>
          </div>
          <BookShelfChanger current={book.shelf}/>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors.join(", ")}</div>
      </div>
    </li>
  }
}

class BookShelf extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    books: PropTypes.array,
  }

  render() {
    const
      books = this.props.books,
      booksHere = books.filter(
        book => {
          return book.shelf === this.props.id // keep books in this shelf
        },
      ),
      bookElements = booksHere ? booksHere.map(book => <Book key={book.id} book={book}/>) :
        <div key="no-books">No books in this shelf</div>


    return <div className="bookshelf">
      <h2 className="bookshelf-title">
        {this.props.name}
      </h2>
      <div className="bookshelf-counts">{booksHere.length} / {books.length}</div>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {bookElements}
        </ol>
      </div>
    </div>
  }
}

class BookLibrary extends React.Component {
  static propTypes = {
    books: PropTypes.array,
  }

  render() {
    if (this.props.books === null) {
      return <div>Loading...</div>
    }
    const shelfElements = availableShelves
      .filter(shelf => shelf.dontList !== true)
      .map(
        shelf => <BookShelf key={shelf.id}
                            id={shelf.id}
                            books={this.props.books}
                            name={shelf.name}/>,
      )

    return <div className="list-books">

      <div className="list-books-content">
        <div>
          {shelfElements}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  }
}

export default BookLibrary
