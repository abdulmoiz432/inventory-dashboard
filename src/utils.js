export const CATEGORIES = ['Electronics', 'Clothing', 'Grocery', 'Books', 'Other']

export const getStatus = (stock) =>
  stock === 0 ? 'Out of Stock' : stock <= 5 ? 'Low Stock' : 'In Stock'
