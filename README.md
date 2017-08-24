MyReads: A Book Tracking App
============================

## Udacity React nanodegree

  Dario Varotto - Jul 2017 cohort

The first project for the [Udacity React nanodegree](https://www.udacity.com/degrees/react-nanodegree--nd019):
an application to create a bookshelf to select and categorize books.

It allows to search, consuming a Node API via React and organize the books
practicing the React fundamentals.

We start from a [create-react-app](https://github.com/facebookincubator/create-react-app/),
a client API, and some template code from [the starter project](https://github.com/udacity/reactnd-project-myreads-starter) and we
add the React functionalities.


## How to run

* Clone the repo
	
		git clone git@github.com:dariosky/udacity-myreads.git
		cd udacity-myreads
	
* Install the dependencies
		
		yarn

* Run the app

		yarn start
		
  The app will run on port 3000, browser will open automatically


## Notes

This project covers the React Foundamentals, state bubbling, React components
communicate with a remote API server.

Using the various component required passing some callbacks function
to have the message reacing the parent component that takes care of
the state.

This will become better using Redux, next part of course ;)

We have component for the BookLibrary, the BookSearch page,
BookShelf, Book and BookShelfChanger, and we keep the shelves sorted by name.

In the BookSearch component we reuse all the components, the only difference
(in CSS) is that known books are hilighted. Book state is consistent across views.

Finally the number of shelves can be tuned easily in the `availableShelves`.
