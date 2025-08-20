const User = require('../models/User');

const getStats = async (req, res) => {
    try {
    const user = await User.findById(req.params.id).select('totalFocusTime completedSessions tasksCompleted currentStreak');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const updateStats = async (req, res) => {
    try {
    const { focusTime, tasksCompleted } = req.body; 
    const user = await User.findById(req.params.id);

    user.totalFocusTime += focusTime;
    user.completedSessions += 1;
    user.tasksCompleted += tasksCompleted;

    
    const today = new Date().toDateString();
    const lastActive = user.lastActive?.toDateString();
    if (lastActive !== today) {
      user.currentStreak += 1;
    }
    user.lastActive = new Date();

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
    getStats,   
    updateStats
}