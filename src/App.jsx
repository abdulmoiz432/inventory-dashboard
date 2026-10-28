import { useState, useEffect, useMemo, useCallback } from 'react'
import { useTheme } from './context/ThemeContext.jsx'
import { CATEGORIES, getStatus } from './utils.js'
import Header from './components/functional/Header.jsx'
import CardWrapper from './components/functional/CardWrapper.jsx'
import InventoryMetrics from './components/functional/InventoryMetrics.jsx'
import ProductForm from './components/functional/ProductForm.jsx'
import ProductList from './components/functional/ProductList.jsx'
import AuditLogger from './components/class/AuditLogger.jsx'

const loadProducts = () => JSON.parse(localStorage.getItem('products') || '[]')

export default function App() {
  const { theme } = useTheme()
  const [products, setProducts] = useState(loadProducts)
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [event, setEvent] = useState(null)
  const [showLogger, setShowLogger] = useState(true)

 
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
    document.title = `Inventory (${products.length} products)`
  }, [products])

  const log = useCallback((message) => setEvent({ id: Date.now(), message }), [])

  const addProduct = useCallback((p) => {
    setProducts((prev) => [...prev, { ...p, id: Date.now() }])
    log(`Product added: ${p.title}`)
  }, [log])

  const updateStock = useCallback((product, delta) => {
    setProducts((prev) => prev.map((p) =>
      p.id === product.id ? { ...p, stock: Math.max(0, p.stock + delta) } : p))
    log(`Stock updated: ${product.title} (${delta > 0 ? '+' : ''}${delta})`)
  }, [log])

  const deleteProduct = useCallback((product) => {
    setProducts((prev) => prev.filter((p) => p.id !== product.id))
    log(`Item deleted: ${product.title}`)
  }, [log])

  const toggleLogger = useCallback(() => setShowLogger((s) => !s), [])

  const filtered = useMemo(() => products.filter((p) =>
    (category === 'All' || p.category === category) &&
    (status === 'All' || getStatus(p.stock) === status)), [products, category, status])

  const metrics = useMemo(() => ({
    count: products.length,
    units: products.reduce((sum, p) => sum + p.stock, 0),
    value: products.reduce((sum, p) => sum + p.stock * p.price, 0),
    low: products.filter((p) => p.stock <= 5).length,
  }), [products])

  return (
    <div className={`app ${theme}`}>
      <Header total={products.length} showLogger={showLogger} onToggleLogger={toggleLogger} />
      <InventoryMetrics metrics={metrics} />

      <CardWrapper title="Add Product">
        <ProductForm onAdd={addProduct} />
      </CardWrapper>

      <CardWrapper title="Products">
        <div className="filters">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>All</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {['All', 'In Stock', 'Low Stock', 'Out of Stock'].map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <ProductList products={filtered} onUpdateStock={updateStock} onDelete={deleteProduct} />
      </CardWrapper>

      {showLogger && (
        <CardWrapper title="Audit Log">
          <AuditLogger event={event} />
        </CardWrapper>
      )}
    </div>
  )
}
