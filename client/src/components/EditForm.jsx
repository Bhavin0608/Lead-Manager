import {useEffect, useState} from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

const EditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        source: "",
        status: "",
    });

    useEffect(() => {
        const fetchLead = async() => {
            try {
                const response = await fetch(`/api/leads/${id}`, {
                    method: "GET",
                });
                if(response.ok){
                    const data = await response.json();
                    setFormData(data);
                }
            }
            catch (error) {
                console.error("Error fetching lead:", error);
            }
        }
        fetchLead();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/leads/${id}`, {
                method: "PATCH",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Error updating lead');
            }
            else {
                alert('Lead updated successfully!');
                navigate('/view-leads');
            }
        } catch (error) {
            console.error('Error updating lead:', error);
        }
    }

    return (
        <section className="lead-card edit-card" aria-labelledby="edit-title">
            <Link className="lead-back" to="/view-leads">← All leads</Link>
            <h1 id="edit-title">Edit lead</h1>

            <form className="lead-form" onSubmit={handleSubmit}>
            <label>
                Name
                <input name="name" value={formData.name} onChange={handleChange} required />
            </label>

            <label>
                Company
                <input name="company" value={formData.company} onChange={handleChange} required />
            </label>

            <label>
                Email
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>

            <label>
                Phone
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </label>

            <label>
                Source
                <select name="source" value={formData.source} onChange={handleChange} required>
                <option value="">Select source</option>
                {["Website", "Referral", "Social Media", "Other"].map((source) => (
                    <option key={source} value={source}>{source}</option>
                ))}
                </select>
            </label>

            <label>
                Status
                <select name="status" value={formData.status} onChange={handleChange} required>
                <option value="">Select status</option>
                {["New", "Contacted", "Qualified", "Lost"].map((status) => (
                    <option key={status} value={status}>{status}</option>
                ))}
                </select>
            </label>

            <div className="lead-form-actions">
                <Link className="lead-button" to="/view-leads">Cancel</Link>
                <button className="lead-button lead-primary" type="submit">Save changes</button>
            </div>
            </form>
        </section>
        );
}

export default EditForm;