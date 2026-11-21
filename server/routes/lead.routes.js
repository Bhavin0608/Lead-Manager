import express from 'express';
import { createLead, getLeads, updateLead, getLeadById } from '../controllers/lead.controller.js';

const router = express.Router();

router.post('/', createLead);
router.get('/', getLeads);
router.get('/:id', getLeadById);
router.patch('/:id', updateLead);

export default router;