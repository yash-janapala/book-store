import {Component} from "react";
import {FaTrash} from "react-icons/fa";
import "./index.css";

class CartItem extends Component {
    render(){
        const {cartItemDetails} = this.props
        const {title, subtitle, image, price} = cartItemDetails
        return (
            <div className = "cart-item-container">
                <img src={image} alt={title} className="cart-book-image" />
                <div className = "product-info-container">
                    <h1 className="book-title">{title}</h1>
                    <p className="cart-book-subtitle">{subtitle}</p>
                    <h1 className="book-price">{price}</h1>
                </div>
                <div className = "product-actions-container">
                    <button className = "delete-button">
                        <FaTrash className = "delete-icon"/>
                    </button>
                </div>
                <div className = "amount-container">
                    <h1 className="book-price">{price}</h1>
                </div>      
            </div>

        )
    }
}

export default CartItem