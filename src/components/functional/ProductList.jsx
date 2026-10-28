import ProductCard from './ProductCard.jsx'

export default function ProductList({ products, onUpdateStock, onDelete }) {
  return products.length === 0 ? (
    <p className="muted">No products found. Add one above!</p>
  ) : (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p}
          onUpdateStock={onUpdateStock} onDelete={onDelete} />
      ))}
    </div>
  )
}
