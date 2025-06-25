import Pet from '../models/pet.js';

export const createPet = async (req, res) => {
  try {
    // Destructure expected fields from the request body
    const { name, age, breed, gender, weight, type, medicalNotes } = req.body;

    // Basic validation
    if (!name || !age || !breed || !weight || !type) {
      return res.status(400).json({ msg: 'Missing required pet fields.' });
    }

    // Prepare pet data without image
    const petData = {
      name,
      age,
      breed,
      gender,
      weight,
      type,
      medicalNotes: medicalNotes || '',
      user: req.user.id,
    };

    // Create the pet
    const newPet = await Pet.create(petData);

    // Return success response
    res.status(201).json({
      msg: 'Pet created successfully.',
      pet: newPet,
    });

  } catch (err) {
    console.error('Error in createPet:', err.message);
    res.status(500).json({
      msg: 'An error occurred while creating the pet.',
      error: err.message,
    });
  }
};

export const getMyPets = async (req, res) => {
  try {
    const pets = await Pet.find({ user: req.user.id });
    res.json(pets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching pets', err });
  }
};

export const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) {
      return res.status(404).json({ msg: 'Pet not found' });
    }
    res.json(pet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error updating pet', err });
  }
};

export const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).json({ msg: 'Pet not found' });
    }
    res.json({ msg: 'Pet deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error deleting pet', err });
  }
};
