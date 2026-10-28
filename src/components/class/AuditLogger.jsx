import React from 'react'


class AuditLogger extends React.Component {
  state = { logs: [], toast: '' }
  timer = null


  componentDidMount() {
    const saved = JSON.parse(localStorage.getItem('auditLogs') || '[]')
    this.setState({ logs: saved })
  }

  componentDidUpdate(prevProps, prevState) {
    
    if (this.props.event && this.props.event !== prevProps.event) {
      const entry = { ...this.props.event, time: new Date().toLocaleTimeString() }
      this.setState({
        logs: [entry, ...this.state.logs].slice(0, 20),
        toast: entry.message,
      })
      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.setState({ toast: '' }), 2500)
    }
    
    if (this.state.logs !== prevState.logs) {
      localStorage.setItem('auditLogs', JSON.stringify(this.state.logs))
    }
  }

  
  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  clearLogs = () => {
    localStorage.removeItem('auditLogs')
    this.setState({ logs: [] })
  }

  render() {
    const { logs, toast } = this.state
    return (
      <div>
        {logs.length === 0 ? (
          <p className="muted">No activity yet.</p>
        ) : (
          <ul className="log-list">
            {logs.map((log) => (
              <li key={log.id}>
                <span className="muted">{log.time}</span> {log.message}
              </li>
            ))}
          </ul>
        )}
        {logs.length > 0 && <button onClick={this.clearLogs}>Clear logs</button>}
        {toast && <div className="toast">{toast}</div>}
      </div>
    )
  }
}

export default AuditLogger
