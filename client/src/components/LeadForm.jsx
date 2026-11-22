import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LeadForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "",
    status: "New",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (saving) return;

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(
          typeof data?.message === "string"
            ? data.message
            : "Couldn’t save the lead. Please check the fields and try again."
        );
        return;
      }

      navigate("/view-leads");
    } catch {
      setError("Couldn’t reach the server. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="lead-card edit-card" aria-labelledby="add-lead-title">
      <Link className="lead-back" to="/view-leads">
        ← All leads
      </Link>

      <h1 id="add-lead-title">Add a lead</h1>

      <form className="lead-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Company
          <input
            name="company"
            autoComplete="organization"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            required
          />
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
            {["New", "Contacted", "Qualified", "Lost"].map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </label>

        <div className="lead-form-actions">
          {error && <span className="lead-error" role="alert">{error}</span>}

          <Link className="lead-button" to="/view-leads">Cancel</Link>
          <button className="lead-button lead-primary" type="submit" disabled={saving}>
            {saving ? "Saving…" : "Add lead"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default LeadForm;