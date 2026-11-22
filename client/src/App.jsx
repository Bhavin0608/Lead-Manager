import LeadForm from './components/LeadForm'
import EditForm from './components/EditForm'
import { LeadsPage } from './pages/LeadsPage'
import { Home } from './pages/Home'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ddd' }}>
        <Link to="/view-leads">All Leads</Link>
        <Link to="/add-lead">Add Lead</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view-leads" element={<LeadsPage />} />
        <Route path="/add-lead" element={<LeadForm />} />
        <Route path="/edit-lead/:id" element={<EditForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
