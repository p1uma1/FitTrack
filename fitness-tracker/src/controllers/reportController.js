const Report = require('../models/Report');


const getReports = async (req, res) => {
  console.log('getreports function called');
  try {
    const userId = req.user._id;
    const reports = await Report.find({ userId });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};


const createReport = async (req, res) => {
  // Extract userId from the authenticated user (assuming it's stored in req.user from the middleware)
  const userId = req.user.id;
  const { date, value, unit } = req.body; // Assuming these are provided in the request body

  try {
    // Find the report by the user ID
    let report = await Report.findOne({ userId });
    
    // If report doesn't exist, create a new one
    if (!report) {
      report = new Report({ userId, data: [] });
    }

    // Push new data entry into the data array
    report.data.push({ date, value, unit });

    // Save the updated report document
    await report.save();

    res.status(201).json(report);
  } catch (err) {
    console.error('Error adding data to report:', err);
    res.status(500).json({ message: 'Failed to add data to report', error: err });
  }
};


module.exports = { getReports, createReport };
