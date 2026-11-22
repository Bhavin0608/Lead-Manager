import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const LeadsPage = () => {
    const [leads, setLeads] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const query = searchTerm.trim().toLowerCase();

    const filteredLeads = leads.filter((lead) => {
        const matchesName = lead.name.toLowerCase().includes(query);
        const matchesStatus = !selectedStatus || lead.status === selectedStatus;
        return matchesName && matchesStatus;
    });

    useEffect(() => {
        async function fetchLeads() {
            try {
                const response = await fetch("/api/leads");
                if (!response.ok) throw new Error("Couldn’t load leads.");
                    setLeads(await response.json());
                } catch {
                    setError("Couldn’t load leads. Refresh the page to try again.");
                } finally {
                    setLoading(false);
            }
        }
        fetchLeads();
    }, []);

    async function handleDelete(lead) {
        if (!window.confirm(`Delete ${lead.name}?`)) return;
        setError("");
        try {
            const response = await fetch(`/api/leads/${lead._id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Delete failed.");
            setLeads((current) => current.filter((item) => item._id !== lead._id));
        } catch {
            setError(`Couldn’t delete ${lead.name}. Please try again.`);
        }
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const SearchedName = e.target.value.toLowerCase();
        const FilteredLeads = SearchedName ? leads.filter((lead) => lead.name.toLowerCase().includes(SearchedName)) : leads;
        setFilteredLeads(FilteredLeads);
    }

    const handleStatusChange = (e) => {
        const selectedStatus = e.target.value;
        const FilteredLeads = selectedStatus ? leads.filter((lead) => lead.status === selectedStatus) : leads;
        setFilteredLeads(FilteredLeads);
    }

    return (
        <section className="lead-card" aria-labelledby="leads-title">
            <header className="lead-heading">
            <h1 id="leads-title">All leads</h1>
            <Link className="lead-button lead-primary" to="/add-lead">+ Add lead</Link>
            </header>

            <div className="lead-toolbar">
            <label>
                Search by name
                <input
                type="search"
                placeholder="e.g. Riya Shah"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </label>

            <label>
                Status
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="">All statuses</option>
                {["New", "Contacted", "Qualified", "Lost"].map((status) => (
                    <option key={status} value={status}>{status}</option>
                ))}
                </select>
            </label>
            </div>

            {error && <p className="lead-error" role="alert">{error}</p>}

            {loading ? (
            <p role="status">Loading leads…</p>
            ) : filteredLeads.length > 0 ? (
            <div className="lead-table-scroll" role="region" aria-label="Leads table" tabIndex={0}>
                <table className="lead-table">
                <thead>
                    <tr>
                    {["Name", "Email", "Phone", "Company", "Source", "Status", "Actions"].map((heading) => (
                        <th key={heading} scope="col">{heading}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredLeads.map((lead) => (
                    <tr key={lead._id}>
                        <th scope="row">{lead.name}</th>
                        <td>{lead.email}</td>
                        <td>{lead.phone}</td>
                        <td>{lead.company}</td>
                        <td>{lead.source}</td>
                        <td>
                        <span className="lead-status" data-status={lead.status}>
                            {lead.status}
                        </span>
                        </td>
                        <td>
                        <div className="lead-row-actions">
                            <Link to={`/edit-lead/${lead._id}`}>Edit</Link>
                            <button type="button" onClick={() => handleDelete(lead)}>Delete</button>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            ) : !error && (
            <p className="lead-empty">
                {leads.length ? "No leads match these filters." : "No leads yet. Add your first lead to get started."}
            </p>
            )}
        </section>
    );
}