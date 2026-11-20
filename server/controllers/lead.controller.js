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