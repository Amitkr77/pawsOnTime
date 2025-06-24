import Schedule from '../models/schedule.js';

// Create a new schedule
export const createSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json(schedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error creating schedule', err });
  }
};

// Get schedules by pet ID
export const getSchedulesByPet = async (req, res) => {
  try {
    const schedules = await Schedule.find({ pet: req.params.petId });
    if (!schedules.length) {
      return res.status(404).json({ msg: 'No schedules found for this pet' });
    }
    res.json(schedules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching schedules', err });
  }
};

// Update a schedule by ID
export const updateSchedule = async (req, res) => {
  try {
    const updated = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ msg: 'Schedule not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error updating schedule', err });
  }
};

// Delete a schedule by ID
export const deleteSchedule = async (req, res) => {
  try {
    const deleted = await Schedule.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: 'Schedule not found' });
    }
    res.json({ msg: 'Schedule deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error deleting schedule', err });
  }
};
