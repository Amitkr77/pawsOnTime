import Walker from '../models/walker.js';

// Pet Parent: Create walk request
export const createWalkRequest = async (req, res) => {
  try {
    const walk = await Walker.create(req.body);
    res.status(201).json(walk);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error requesting walk', err });
  }
};

// Walker: Accept or update walk request
export const updateWalkRequest = async (req, res) => {
  try {
    const updated = await Walker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ msg: 'Walk request not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error updating walk request', err });
  }
};

// Pet Parent or Walker: Get all walks
export const getMyWalks = async (req, res) => {
  try {
    const filter = req.user.role === 'walker'
      ? { walker: req.user.id }
      : { petParent: req.user.id };
    
    const walks = await Walker.find(filter).populate('pet walker');
    
    if (!walks.length) {
      return res.status(404).json({ msg: 'No walk requests found' });
    }
    
    res.json(walks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching walk requests', err });
  }
};
