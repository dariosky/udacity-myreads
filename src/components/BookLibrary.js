import React from 'react'
import {Link} from 'react-router-dom'
import sortBy from 'sort-by'

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
    onChangeShelf: PropTypes.func,
  }

  render() {
    return <div className="book-shelf-changer">
      <select defaultValue={this.props.current} onChange={(e) => {
        const newShelf = e.target.value
        console.log(`Changed shelf to ${newShelf}`)
        this.props.onChangeShelf(newShelf)
      }}>
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
    onMoveBook: PropTypes.func,
  }

  render() {
    const book = this.props.book,
      // sometime we miss the cover, let's use a generic one
      coverUrl = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail :
        'http://www.akmarshall.com/wp-content/uploads/2012/12/mysterybook.gif',
      authors = book.authors ? book.authors.join(", ") : ''

    return <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            backgroundImage: `url(${coverUrl})`,
          }}>
          </div>
          <BookShelfChanger current={book.shelf}
                            onChangeShelf={(newShelf) => {
                              this.props.onMoveBook(book, newShelf)
                            }}


          />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    </li>
  }
}

class BookShelf extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    books: PropTypes.array,
    onMoveBook: PropTypes.func,
  }

  render() {
    const
      books = this.props.books,
      booksHere = books.filter(
        book => {
          return book.shelf === this.props.id // keep books in this shelf
        },
      ).sort(sortBy('title', 'publishedDate')),
      bookElements = booksHere.length ? booksHere.map(
        book => <Book key={book.id}
                      onMoveBook={this.props.onMoveBook}
                      book={book}/>,
      ) : <div key="no-books">No books in this shelf</div>


    return <div className="bookshelf">
      <h2 className="bookshelf-title">
        {this.props.name}
      </h2>
      <div className="bookshelf-counts">{booksHere.length}</div>
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
    onMoveBook: PropTypes.func,
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
                            onMoveBook={this.props.onMoveBook}
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

export {BookLibrary, Book}

