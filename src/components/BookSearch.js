import React from 'react'
import {Link} from 'react-router-dom'
import sortBy from 'sort-by'
import {Book} from './BookLibrary'
import PropTypes from 'prop-types'
import * as BookAPI from '../BooksAPI'
import {throttle} from 'lodash'

class BookSearch extends React.Component {
  static propTypes = {
    books: PropTypes.array,
    onMoveBook: PropTypes.func,
  }

  constructor() {
    super()
    this.state = {
      results: [],
    }
  }

  debouncedSearch = throttle((term) => {
    console.log(`searching ${term}`)
    if (!term) {
      this.setState({results: []})
    }
    else {
      BookAPI.search(term).then(results => {
        if (results.error) {
          console.log("API told me", results.error)
          results = []
        }
        console.log(`Got ${results.length} results`)
        console.log(results)
        this.setState({results})
      })
    }
  }, 300) // throttled once every 300ms

  onSearch() {
    const term = this._searchInput.value
    this.debouncedSearch(term)
  }

  render() {
    const booksHere = this.state.results.sort(sortBy('title', 'publishedDate')),
      bookElements = booksHere.length ? booksHere.map(
        book => <Book key={book.id}
                      onMoveBook={this.props.onMoveBook}
                      book={book}/>,
        ) :
        <div key="no-books">
        </div>
    return <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
          <input type="text"
                 ref={(input) => {
                   this._searchInput = input
                 }}
                 onChange={this.onSearch.bind(this)}
                 placeholder="Search by title or author"/>

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {bookElements}
        </ol>
      </div>
    </div>
  }
}

export default BookSearch
