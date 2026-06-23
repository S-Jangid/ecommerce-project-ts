import ProductContainer from "./ProductContainer"

export function ProductsGrid({ products, checkmarkIcon, loadCart }) {
    return (
        <div className="products-grid">
            {products.map((product) => {
                return(
                    <ProductContainer key={product.id} product={product} loadCart={loadCart} />
                )
            })}

        </div>
    )
}