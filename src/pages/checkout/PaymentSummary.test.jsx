import { render, within } from "@testing-library/react";
import { it, describe, beforeEach, expect, vi } from "vitest";
import { PaymentSummary } from "./PaymentSummary";
import { MemoryRouter, useLocation, useNavigate } from "react-router";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

vi.mock('axios');

describe('Checks Payment Summary ', () => {

    let paymentSummary;
    let user;

    beforeEach(() => {
        paymentSummary = {
        "totalItems": 7,
        "productCostCents": 14364,
        "shippingCostCents": 499,
        "totalCostBeforeTaxCents": 14863,
        "taxCents": 1486,
        "totalCostCents": 16349
        }
        user = userEvent.setup();
    })
    it('Checks the rendering of product Summary', () => {
        render(<MemoryRouter><PaymentSummary paymentSummary={paymentSummary}/></MemoryRouter>);
        
        const rows = screen.getAllByTestId("payment-summary-row")
        
        
        
        expect(within(rows[0]).getByText('$143.64')).toBeInTheDocument();
        expect(within(rows[1]).getByText('$4.99')).toBeInTheDocument();
        expect(within(rows[2]).getByText('$148.63')).toBeInTheDocument();
        
        expect(rows[3]).toHaveTextContent('$14.86');
        expect(rows[4]).toHaveTextContent('$163.49');
    })
    
    it('Checks the place order functionality', async () => {

        function Location(){
            const location = useLocation();
            return(
                <div data-testid="url-path">
                    {location.pathname}
                </div>
            )
        }
        
        render(<MemoryRouter><Location/><PaymentSummary paymentSummary={paymentSummary}/></MemoryRouter>);
        const placeOrderButton = screen.getByTestId("place-order-button");

        await user.click(placeOrderButton);

        expect(axios.post).toHaveBeenCalledWith('/api/orders');

        const navigationPage = screen.getByTestId("url-path");
        
        expect(navigationPage).toHaveTextContent('/orders');
        

    })

})