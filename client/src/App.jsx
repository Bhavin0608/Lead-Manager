import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import LeadForm from "./components/LeadForm";
import EditForm from "./components/EditForm";
import { LeadsPage } from "./pages/LeadsPage";
import { Home } from "./pages/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header className="app-header">
        <div className="app-header-inner">
          <Link to="/" className="app-brand">
            <span className="brand-mark" aria-hidden="true">LM</span>
            Lead Manager
          </Link>

          <nav className="app-nav" aria-label="Main navigation">
            <NavLink to="/view-leads">All leads</NavLink>
            <NavLink to="/add-lead">Add lead</NavLink>
          </nav>
        </div>
      </header>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view-leads" element={<LeadsPage />} />
          <Route path="/add-lead" element={<LeadForm />} />
          <Route path="/edit-lead/:id" element={<EditForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;