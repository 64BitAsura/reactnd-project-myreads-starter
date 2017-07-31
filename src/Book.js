import React,{ Component } from 'react'

class Book extends Component{

 ratingUpdate = (evt) =>
   this.props.changeShelves(((b)=> {
     b.averageRating = evt.target.value
     return b
   })(this.props.info), this.props.info.shelf)


 componentDidMount(){
   this.refs[this.props.info.title].addEventListener('value-changed', this.ratingUpdate);
 }

 componentWillUnmount(){
   this.refs[this.props.info.title].removeEventListener('value-changed',this.ratingUpdate);
 }

 render() {
  return (<li>
  <div className="book">
      <s-rating value={this.props.info.averageRating} ref={this.props.info.title}></s-rating>
    <div className="book-top">
      <div className="book-cover" title={this.props.info.title} style={{ width: 128, height: 188,
        backgroundImage: `url(${(this.props.info.imageLinks && this.props.info.imageLinks.thumbnail)})`
      }}>
        {this.props.info.maturityRating ?
          (<div className="book-marker">
            {this.props.info.maturityRating==="NOT_MATURE"? "Not Mature":"Mature"}
           </div>):("")}
      </div>
      <div className="book-shelf-changer">
        <select value={this.props.info.shelf} onChange={(evt)=> {
          this.props.changeShelves(this.props.info,evt.target.value)
        }}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title" title={this.props.info.title}>
    {this.props.info.title}
    </div>
    {this.props.info.authors && Array.from(this.props.info.authors).map((author) =>
      <div key={author} className="book-authors">{author}</div>
    )}
  </div>
  </li>)
}

}
export default Book;
