export default function CardWrapper({ title, children }) {
  return (
    <section className="card-wrapper">
      {title && <h2>{title}</h2>}
      {children}
    </section>
  )
}
