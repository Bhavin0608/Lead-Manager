import React, { useState } from "react";

const LeadForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        source: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/leads", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            if(response.ok){
                alert("Lead submitted successfully!");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    source: "",
                });
            }
        }
        catch (error) {
            console.error("Error submitting lead:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit} align="center">
            <input type = "text" name = "name" placeholder = "Name" value = {formData.name} onChange = {handleChange} required /><br />
            <input type = "email" name = "email" placeholder = "Email" value = {formData.email} onChange = {handleChange} required /><br />
            <input type = "text" name = "phone" placeholder = "Phone" value = {formData.phone} onChange = {handleChange} required /><br />
            <input type = "text" name = "company" placeholder = "Company" value = {formData.company} onChange = {handleChange} required /><br />
            <select name = "source" value = {formData.source} onChange = {handleChange} required>
                <option value = "">Select Source</option>
                <option value = "Website">Website</option>
                <option value = "Referral">Referral</option>
                <option value = "Social Media">Social Media</option>
                <option value = "Other">Other</option>
            </select><br />
            <button type="submit">Submit</button>
        </form>
    )
}

export default LeadForm;