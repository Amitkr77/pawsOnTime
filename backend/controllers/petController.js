import Pet from '../models/pet.js';

export const createPet = async (req, res) => {
  try {
    const newPet = await Pet.create({ ...req.body, user: req.user.id });
    res.status(201).json(newPet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error creating pet', err });
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
