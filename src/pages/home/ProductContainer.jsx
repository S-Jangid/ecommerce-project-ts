import axios from "axios";
import { amountFormat } from "../../utils/amount-format";
import {  useState } from "react";
import checkmarkIcon from "../../assets/images/icons/checkmark.png"

export default function ProductContainer({ product, loadCart }) {
    const [quantity, setQuantity] = useState(1);

    const [ addMeassage, setAddMessage] = useState(false);

    async function addToCart(){
        await axios.post('/api/cart-items', {
            productId: product.id,
            quantity: quantity,
        })

        setAddMessage(true);
        setTimeout(()=>{ setAddMessage(false)},2000);

        await loadCart();
    }

    async function updateQunatity(event) {
        setQuantity(Number(event.target.value));
        console.log(event.target.value);
    }

    return (
        <div className="product-container"
            data-testid = "product-container"
            key={product.id}>
            <div className="product-image-container">
                <img className="product-image"
                data-testid="product-image"
                    src={product.image} />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <img className="product-rating-stars"
                    data-testid="product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                <div className="product-rating-count link-primary">
                    {product.rating.count}
                </div>
            </div>

            <div className="product-price">
                {amountFormat(product.priceCents)}
            </div>

            <div className="product-quantity-container">
                <select 
                    value={quantity}
                    data-testid =  "product-quantity-selector"
                    onChange={updateQunatity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart" style={{opacity : addMeassage ? 1 : 0}}>
                <img src={checkmarkIcon} />
                Added
            </div>

            <button 
                className="add-to-cart-button button-primary" 
                onClick={addToCart}
                data-testid="add-to-cart-button"
            >
                Add to Cart
            </button>
        </div>
    )
}