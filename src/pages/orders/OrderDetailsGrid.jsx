import dayjs from "dayjs"
import buyAgainIcon from "../../assets/images/icons/buy-again.png"
import { Fragment } from "react"
import { Link } from "react-router"
import axios from "axios"

export function OrderDetailsGrid({ order, loadCart }) {

    
    return (
        <div className="order-details-grid">
            {order.products.map((productElement) => {

                const addToCart = async () => {
                    await axios.post('/api/cart-items',{
                        productId: productElement.productId,
                        quantity: 1
                    });

                    await loadCart()
                }

                return (
                    <Fragment key={productElement.productId}>
                        <div className="product-image-container">
                            <img src={productElement.product.image} />
                        </div>

                        <div className="product-details">
                            <div className="product-name">
                                {productElement.product.name}
                            </div>
                            <div className="product-delivery-date">
                                {`Arriving on: ${dayjs(productElement.estimatedDeliveryTimeMs).format("dddd D")}`}
                            </div>
                            <div className="product-quantity">
                                {`Quantity: ${productElement.quantity}`}
                            </div>
                            <button className="buy-again-button button-primary">
                                <img className="buy-again-icon" src={buyAgainIcon} />
                                <span className="buy-again-message" onClick={addToCart}>Add to Cart</span>
                            </button>
                        </div>

                        <div className="product-actions">
                            <Link to={`/tracking/${order.id}/${productElement.productId}`}>
                                <button className="track-package-button button-secondary">
                                    Track package
                                </button>
                            </Link>
                        </div>
                    </Fragment>
                )
            })}
        </div>
    )
}