import { memo } from 'react'
import { getStatus } from '../../utils.js'

function ProductCard({ product, onUpdateStock, onDelete }) {
  const status = getStatus(product.stock)
  const badge = status === 'In Stock' ? 'green' : status === 'Low Stock' ? 'orange' : 'red'

  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <p className="muted">{product.category} • ${product.price}</p>
      <span className={`badge ${badge}`}>{status}</span>
      <p>Stock: <b>{product.stock}</b></p>
      {product.stock === 0 && <p className="red-text">Please restock!</p>}
      <div className="actions">
        <button onClick={() => onUpdateStock(product, -1)}>−</button>
        <button onClick={() => onUpdateStock(product, 1)}>+</button>
        <button onClick={() => onDelete(product)}>🗑 Delete</button>
      </div>
    </div>
  )
}

export default memo(ProductCard)
