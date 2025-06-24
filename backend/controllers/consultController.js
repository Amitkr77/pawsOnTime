import Consultation from '../models/consultation.js';

export const createConsultation = async (req, res) => {
  try {
    const newConsult = await Consultation.create(req.body);
    res.status(201).json(newConsult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error creating consultation', err });
  }
};

export const updateConsultation = async (req, res) => {
  try {
    const consult = await Consultation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!consult) {
      return res.status(404).json({ msg: 'Consultation not found' });
    }
    res.json(consult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error updating consultation', err });
  }
};

export const getUserConsultations = async (req, res) => {
  try {
    // Filter consultations based on the user's role (doctor or petParent)
    const filter = req.user.role === 'doctor'
      ? { doctor: req.user.id }
      : { petParent: req.user.id };

    const consults = await Consultation.find(filter)
      .populate('pet doctor'); // Populate associated pet and doctor data

    res.json(consults);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching consultations', err });
  }
};
