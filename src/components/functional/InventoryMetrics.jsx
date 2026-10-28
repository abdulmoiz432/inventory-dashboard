export default function InventoryMetrics({ metrics }) {
  return (
    <div className="metrics">
      <div><b>{metrics.count}</b><span>Products</span></div>
      <div><b>{metrics.units}</b><span>Total Units</span></div>
      <div><b>${metrics.value.toFixed(2)}</b><span>Stock Value</span></div>
      <div><b>{metrics.low}</b><span>Low / Out</span></div>
    </div>
  )
}
