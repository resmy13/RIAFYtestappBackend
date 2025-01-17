import express from 'express';
import {
    getAvailableSlots,
    bookAppointment,
} from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/slots/:date', getAvailableSlots); // Fetch available slots
router.post('/book', bookAppointment);        // Book an appointment

export default router;
