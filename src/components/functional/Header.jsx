import ThemeToggle from './ThemeToggle.jsx'

export default function Header({ total, showLogger, onToggleLogger }) {
  return (
    <header className="header">
      <h1>📦 Inventory Dashboard ({total} products)</h1>
      <div>
        <button onClick={onToggleLogger}>
          {showLogger ? 'Hide' : 'Show'} Audit Log
        </button>{' '}
        <ThemeToggle />
      </div>
    </header>
  )
}
