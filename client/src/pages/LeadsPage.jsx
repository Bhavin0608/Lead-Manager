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
                                <Link to={`/edit-lead/${lead._id}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}