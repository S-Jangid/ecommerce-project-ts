import dayjs from "dayjs";
import { amountFormat } from "../../utils/amount-format";
import { CartItemDetails } from "./CartItemDetails";
import { DeliveryDate } from "./DeliveryDate";
import axios from "axios";

export function OrderSummary({deliveryOptions, cart, loadCart}) {
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                    return deliveryOption.id === cartItem.deliveryOptionId;
                })
                return (
                    <div className="cart-item-container" key={cartItem.productId}>
                        <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />

                        <div className="cart-item-details-grid">
                            <CartItemDetails cartItem={cartItem} loadCart={loadCart}/>

                            <div className="delivery-options">
                                <div className="delivery-options-title">
                                    Choose a delivery option:
                                </div>

                                {deliveryOptions.map((deliveryOption) => {
                                    let deliveryPrice = "Free Shipping";

                                    if (deliveryOption.priceCents > 0) {
                                        deliveryPrice = `${amountFormat(deliveryOption.priceCents)} - Shipping`;
                                    }

                                    const updateDeliveryOptions = async()=>{
                                        await axios.put(`/api/cart-items/${cartItem.productId}`,{
                                            deliveryOptionId: deliveryOption.id,
                                        })

                                        await loadCart();
                                    }

                                    return (
                                        <div key={deliveryOption.id} className="delivery-option" onClick={updateDeliveryOptions}>
                                            <input type="radio"
                                                checked={deliveryOption.id === cartItem.deliveryOptionId}
                                                onChange={() => {}}
                                                className="delivery-option-input"
                                                name={`delivery-option-${cartItem.productId}`} />
                                            <div>
                                                <div className="delivery-option-date">
                                                    {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(" dddd, MMMM D")}
                                                </div>
                                                <div className="delivery-option-price">
                                                    {deliveryPrice}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}