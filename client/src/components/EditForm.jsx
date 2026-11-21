import {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
                navigate('/');
            }
        } catch (error) {
            console.error('Error updating lead:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit} align="center">
            <input type = "text" name = "name" placeholder = "Name" value = {formData.name} onChange = {handleChange} required /><br />
            <input type = "email" name = "email" placeholder = "Email" value = {formData.email} onChange = {handleChange} required /><br />
            <input type = "text" name = "phone" placeholder = "Phone" value = {formData.phone} onChange = {handleChange} required /><br />
            <input type = "text" name = "company" placeholder = "Company" value = {formData.company} onChange = {handleChange} required /><br />
            <select name = "source" value = {formData.source} onChange = {handleChange} required>
                <option value="">Select Source</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Social Media">Social Media</option>
                <option value="Other">Other</option>
            </select><br />
            <select name = "status" value = {formData.status} onChange = {handleChange} required>
                <option value="">Select Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
            </select><br />
            <button type = "submit">Update Lead</button>
        </form>
    )
}

export default EditForm;