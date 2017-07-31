import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

const Search = (props) =>
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" onChange={(event)=> props.search(event.target.value)} placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {Array.from(props.result).map((book)=>
              <Book key={book.id} info={book} changeShelves={props.changeShelves}/>
            )}
          </ol>
        </div>
      </div>


export default Search
