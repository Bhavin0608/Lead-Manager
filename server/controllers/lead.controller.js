import Lead from '../models/Lead.js';

export const createLead = async(req, res) => {
    const { name, email, phone, company, source } = req.body;
    try {
        const newLead = new Lead({ name, email, phone, company, source });
        const savedLead = await newLead.save();
        res.status(201).json(savedLead);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating lead', error: error.message });
    }
}

export const getLeads = async(req, res) => {
    try {
        const leads = await Lead.find();
        res.status(200).json(leads);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching leads', error: error.message });
    }
}

export const getLeadById = async(req, res) => {
    const { id } = req.params;
    try {
        const lead = await Lead.findById(id);
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(200).json(lead);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching lead', error: error.message });
    }
}

export const updateLead = async(req, res) => {
    const { id } = req.params;
    const { name, email, phone, company, source, status } = req.body;
    try {
        const lead = await Lead.findById(id);
        if(!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        lead.name = name || lead.name;
        lead.email = email || lead.email;
        lead.phone = phone || lead.phone;
        lead.company = company || lead.company;
        lead.source = source || lead.source;
        lead.status = status || lead.status;
        const updatedLead = await lead.save();
        res.status(200).json(updatedLead);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating lead', error: error.message });
    }
}