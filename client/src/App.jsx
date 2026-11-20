import LeadForm from './components/LeadForm'
import { LeadsPage } from './pages/LeadsPage'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ddd' }}>
        <Link to="/">All Leads</Link>
        <Link to="/add-lead">Add Lead</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LeadsPage />} />
        <Route path="/add-lead" element={<LeadForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
