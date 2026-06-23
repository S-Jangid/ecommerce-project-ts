import { Link } from "react-router"
import { Header } from "../components/Header"
import "./TrackingPage.css"
import { useParams } from "react-router"
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export function TrackingPage({ cart }) {
    const { orderId, productId } = useParams();

    const [ order, setOrder ] = useState(null);

    useEffect(()=>{

        const fetchOrder = async () => {

            const response = await axios.get(`/api/orders/${orderId}?expand=products`)

            setOrder(response.data);
        }

        fetchOrder();
    },[orderId]);

    
    if( ! order ){
        return null;
    }
    const product = order.products.find((product) =>  product.productId === productId );

    const totalTimeRequiredMs = product.estimatedDeliveryTimeMs - order.orderTimeMs;

    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

    const statusPercentage = ((timePassedMs*100/totalTimeRequiredMs))

    let progressBarWidth = statusPercentage;

    if( String(statusPercentage) > "100%"){
        progressBarWidth = "100%";
    }

    const isPreparing = (String(statusPercentage) < "33%"  )
    const isShipped = (String(statusPercentage) > "33%" && String(statusPercentage) < "100%" )
    const isDelivered = (String(statusPercentage) > "100%" )

    return (
        <>
            <title>Tracking</title>
            <link rel="icon" href="/images/tracking-favicon.png" />
            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        {`Arriving on ${dayjs(product.estimatedDeliveryTimeMs).format(" dddd, MMMM D ")}`}
                    </div>

                    <div className="product-info">
                        {product.product.name}
                    </div>

                    <div className="product-info">
                        {`Quantity: ${product.quantity}`}
                    </div>

                    <img className="product-image" src={product.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${ isPreparing && "current-status"}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${ isShipped && "current-status"}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${ isDelivered && "current-status"}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width: `${progressBarWidth}`}}></div>
                    </div>
                </div>
            </div>
        </>
    )
}