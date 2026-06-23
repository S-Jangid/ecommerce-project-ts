import axios from "axios"
import { amountFormat } from "../../utils/amount-format"
import './CartItemDetails.css'
import { useRef, useState } from "react"

export function CartItemDetails({ cartItem, loadCart }) {

    const [quantityUpdate, setQuantityUpdate] = useState(false);

    const quantityRef = useRef(null);

    const handleQuantity = async (event) =>{
        if(event.key === 'Enter'){
            
            const newQuantity = Number(event.target.value);

            await axios.put(`/api/cart-items/${cartItem.productId}`,{
                quantity: newQuantity
            })
            await loadCart();
            setQuantityUpdate(false);
            
        }else if(event.key === 'Escape'){
            setQuantityUpdate(false);
        }
    }

    const updateQauntity = async()=>{
        
        if(quantityUpdate){

            
            setQuantityUpdate(false);
        }else{
            
            await setQuantityUpdate(true);
            const inputElement = quantityRef.current;
            inputElement.focus();
        }
    }

    // using ref to update the cart and the update button (My approach :) )

    // const updateQauntity = async()=>{
        
    //     if(quantityUpdate){

    //         const inputElement = quantityRef.current;
    //         const newQuantity = Number(inputElement.value);

    //         setQuantityUpdate(false);
    //         await axios.put(`/api/cart-items/${cartItem.productId}`,{
    //             quantity: newQuantity
    //         })

    //         await loadCart();

    //     }else{
    //         setQuantityUpdate(true);
    //     }
    // }

    const deleteCartItem = async() =>{
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    }
    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {amountFormat(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: {quantityUpdate
                        ?<input type="number" defaultValue={cartItem.quantity} className="quantity-input" min="1" ref={quantityRef} onKeyDown={handleQuantity} />
                        :<span className="quantity-label">{cartItem.quantity}</span>}
                    </span>
                    <span className="update-quantity-link link-primary" onClick={updateQauntity}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
        </>
    )
}