import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Search from './Search'
import Shelf from './Shelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    result: []
  }

  group = (books, key) => books.reduce((returnValue, current)=>{
    (returnValue[current[key]] = returnValue[current[key]] || []).push(current)
    return returnValue
  },{})

  componentDidMount(){
    BooksAPI.getAll().then((books)=> {
        const shelves = this.group(books, 'shelf')
        this.setState(shelves)
    })
  }

  search = (term) =>
    BooksAPI.search(term,20).then((books)=>{
      let booksObj = Object.values(this.state).reduce((rVal,current)=>rVal.concat(current),[]).reduce((rVal, current)=> {
        rVal[current.id]=current
        return rVal
      } ,{})
      this.setState({
        result: Array.from((books || [])).map((book)=> {
          (booksObj[book.id]&&(book.shelf=booksObj[book.id].shelf))||(book.shelf='none')
          return book
      })
    })
  })

  changeShelves = (book,shelf) =>
    BooksAPI.update(book,shelf).then((update) => {
      book.shelf != shelf && this.setState((state) => ({
        [book.shelf]: (state[book.shelf] || []).filter((b)=> b.id !== book.id),
        [shelf]: (state[shelf] || []).concat(((b)=>{b.shelf=shelf; return b})(book))
    }))
  })


  render() {
    return (
      <div className="app">
        <Route  path="/search" render={()=>
          <Search result={this.state.result} changeShelves={this.changeShelves} search={this.search}/>
        }/>

         <Route exact path="/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf id="currentlyReading" books={this.state.currentlyReading} changeShelves={this.changeShelves} name="Currently Reading" />
                <Shelf id="wantToRead" books={this.state.wantToRead} changeShelves={this.changeShelves} name="Want to Read" />
                <Shelf id="read" books={this.state.read} changeShelves={this.changeShelves} name="Read" />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
