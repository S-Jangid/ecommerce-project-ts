import axios from 'axios'
import { useState, useEffect } from 'react'
import { Header } from "../../components/Header"
import { ProductsGrid } from './ProductsGrid'
// import { products } from "../../starting-code/data/products"
import "./HomePage.css"
import { useSearchParams } from 'react-router'

export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);
    
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');

    useEffect(()=>{
        
        const fetchProducts = async () =>{
            let response = [];
            if(search){
                response = await axios.get(`/api/products?search=${search}`);
            }else{
                response = await axios.get('/api/products');
            }
            setProducts(response.data);
        }

        fetchProducts();
    }, [search])
    

    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" href="/images/home-favicon.png" />

            <Header 
                cart={cart}
            />

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    )

}