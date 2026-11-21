import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const LeadsPage = () => {
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        const featchLeads = async () => {
            try {
                const response = await fetch("/api/leads", {
                    method: "GET",
                });
                if (response.ok) {
                    const data = await response.json();
                    setLeads(data);
                } else {
                    console.error("Failed to fetch leads");
                }
            }
            catch (error) {
                console.error("Error fetching leads:", error);
            }
        }
        featchLeads();
    }, []);

    const handleDelete = async (id) => {
        try {
            // Show a confirmation dialog
            if (!window.confirm("Are you sure you want to delete this lead?")) {
                return;
            }
            const response = await fetch(`/api/leads/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setLeads(leads.filter((lead) => lead._id !== id));
            } else {
                console.error("Failed to delete lead");
            }
        }
        catch (error) {
            console.error("Error deleting lead:", error);
        }
    };

    return (
        <div align="center">
            <h1>All Leads</h1>
            <table border="1" cellPadding="5" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Source</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead) => (
                        <tr key={lead._id}>
                            <td>{lead.name}</td>
                            <td>{lead.email}</td>
                            <td>{lead.phone}</td>
                            <td>{lead.company}</td>
                            <td>{lead.source}</td>
                            <td>{lead.status}</td>
                            <td>
                                <button onClick={() => handleDelete(lead._id)}>Delete</button>
                                <button><Link to={`/edit-lead/${lead._id}`}>Edit</Link></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}