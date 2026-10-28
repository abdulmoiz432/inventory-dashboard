import { useState, useRef, useEffect } from 'react'
import { CATEGORIES } from '../../utils.js'

const empty = { title: '', category: CATEGORIES[0], price: '', stock: '' }

export default function ProductForm({ onAdd }) {
  const [form, setForm] = useState(empty)
  const titleRef = useRef(null)

  
  useEffect(() => {
    titleRef.current.focus()
  }, [])

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onAdd({ ...form, price: Number(form.price) || 0, stock: Number(form.stock) || 0 })
    setForm(empty)
    titleRef.current.focus() 
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input ref={titleRef} name="title" placeholder="Product title"
        value={form.title} onChange={handleChange} />
      <select name="category" value={form.category} onChange={handleChange}>
        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
      </select>
      <input name="price" type="number" min="0" placeholder="Price"
        value={form.price} onChange={handleChange} />
      <input name="stock" type="number" min="0" placeholder="Stock"
        value={form.stock} onChange={handleChange} />
      <button type="submit">Add Product</button>
    </form>
  )
}
