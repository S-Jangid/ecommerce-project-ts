import axios from "axios"
import { amountFormat } from "../../utils/amount-format"
import { useNavigate } from "react-router";

export function PaymentSummary({ paymentSummary, loadCart }) {

    const navigate = useNavigate();    
    const placeOrder = async () => {

        await axios.post('/api/orders');
        navigate('/orders');
        await loadCart();
    }

    return (
        <div className="payment-summary">
            {paymentSummary &&
                <>
                    <div className="payment-summary-title">
                        Payment Summary
                    </div>

                    <div 
                        className="payment-summary-row"
                        data-testid = "payment-summary-row"
                    >
                        <div>Items ({paymentSummary.totalItems}):</div>
                        <div className="payment-summary-money">{amountFormat(paymentSummary.productCostCents)}</div>
                    </div>

                    <div 
                        className="payment-summary-row"
                        data-testid = "payment-summary-row"    
                    >
                        <div>Shipping &amp; handling:</div>
                        <div className="payment-summary-money">{amountFormat(paymentSummary.shippingCostCents)}</div>
                    </div>

                    <div 
                        className="payment-summary-row subtotal-row"
                        data-testid = "payment-summary-row"
                    >
                        <div>Total before tax:</div>
                        <div className="payment-summary-money">{amountFormat(paymentSummary.totalCostBeforeTaxCents)}</div>
                    </div>

                    <div 
                        className="payment-summary-row"
                        data-testid = "payment-summary-row"
                    >
                        <div>Estimated tax (10%):</div>
                        <div className="payment-summary-money">{amountFormat(paymentSummary.taxCents)}</div>
                    </div>

                    <div 
                        className="payment-summary-row total-row"
                        data-testid = "payment-summary-row"
                    >
                        <div>Order total:</div>
                        <div className="payment-summary-money">{amountFormat(paymentSummary.totalCostCents)}</div>
                    </div>

                    <button 
                        className="place-order-button button-primary"
                        data-testid = "place-order-button"
                    onClick={placeOrder}>
                        Place your order
                    </button>
                </>
            }
        </div>
    )
}
