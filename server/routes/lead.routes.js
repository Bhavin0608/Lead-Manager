import express from 'express';
import { createLead, getLeads, updateLead, getLeadById, deleteLead } from '../controllers/lead.controller.js';

const router = express.Router();

router.post('/', createLead);
router.get('/', getLeads);
router.get('/:id', getLeadById);
router.patch('/:id', updateLead);
router.delete('/:id', deleteLead);

export default router;