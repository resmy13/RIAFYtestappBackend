import Appointment from '../models/Appointment.js';

const allSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

export const getAvailableSlots = async (req, res) => {
    const { date } = req.params;
    const bookedSlots = await Appointment.find({ date }).select('timeSlot');
    const booked = bookedSlots.map((slot) => slot.timeSlot);
    const availableSlots = allSlots.filter((slot) => !booked.includes(slot));
    res.json(availableSlots);
};

export const bookAppointment = async (req, res) => {
    const { name, phone, date, timeSlot } = req.body;

    const exists = await Appointment.findOne({ date, timeSlot });
    if (exists) return res.status(400).send({ message: 'Slot already booked' });

    const appointment = new Appointment({ name, phone, date, timeSlot });
    await appointment.save();
    res.status(201).send(appointment);
};
