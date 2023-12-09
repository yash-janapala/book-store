import { Component } from "react";
import Header from '../Header';
import SearchInput from "../SearchInput";
import './index.css';
import PriceRange from "../PriceRange";
import BookItem from "../BookItem";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";

const apiStatusConstants = {
    initial : "INITIAL",
    inProgress : "IN_PROGRESS",
    success : "SUCCESS",
    failure : "FAILURE"
}

class BookList extends Component{
    state = {
        apiStatus : apiStatusConstants.initial,
        booksData: [],
        priceRangeValue : [0,0]
    }

    componentDidMount(){
        this.setState({apiStatus:apiStatusConstants.inProgress})
        this.getBooks("")
    }

    getPriceRange = () => {
        const {booksData, priceRangeValue} = this.state
        let [minPrice, maxPrice] = priceRangeValue
        booksData.map((eachBook) => {
          const price = parseFloat(eachBook.price.slice(1))
          if (price < minPrice){
            minPrice = price;
          } else if (price > maxPrice){
            maxPrice = price;
          }
          return null;
        })
        this.setState({priceRangeValue: [Math.round(minPrice), Math.round(maxPrice)]})
    }
    
    getBooks = async (searchQuery) => {
        let bookListUrl = "";
        if (searchQuery === ""){
          bookListUrl = "https://api.itbook.store/1.0/new"
        }
        else{
          bookListUrl = `https://api.itbook.store/1.0/search/${searchQuery}`
        }
        console.log(bookListUrl)
        const response = await fetch(bookListUrl)
        if (response.ok) {
            const jsonResponse = await response.json();
            this.setState({apiStatus: apiStatusConstants.success, booksData: jsonResponse.books}, this.getPriceRange())
        } else if (response.status === 404) {
            this.setState({apiStatus: apiStatusConstants.failure})
        }
    }


    renderLoadingView(){
        return <Loader />
    }
    
    renderSuccessView(){
        const {booksData, priceRangeValue} = this.state
        return (
            <>
                <h1 className="book-items-heading">Books</h1>
                <PriceRange sliderPositions = {priceRangeValue}/>
                <ul className="book-list-container">
                {booksData.map((eachbook) => (
                    <BookItem key= {eachbook.isbn13} bookItemDetails={eachbook}/>
                ))}                
                </ul>
            </>
        )
    }
    
    renderFailureView(){
        return <ErrorMessage />
    }

    renderResults(){
        const {apiStatus} = this.state
        switch(apiStatus) {
            case apiStatusConstants.inProgress:
                return this.renderLoadingView();
            case apiStatusConstants.success:
                return this.renderSuccessView();
            default:
                return this.renderFailureView();
        }
    }

    render() {
        return (
          <>
            <Header />
            <div className="book-list-container">
              <div className="book-list-content-container">
                <SearchInput searchBooks = {this.getBooks}/>
                {this.renderResults()}
              </div>
            </div>
          </>
        )
    }
}

export default BookList;







