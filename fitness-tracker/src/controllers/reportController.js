const mongoose = require('mongoose');
const Report = require('../models/Report');

// Create Report Function
const createReport = async (req, res) => {
  const userId = req.user._id;
  const { type, unit, date, value } = req.body;

  try {
    // Find the report by the user ID and type
    let report = await Report.findOne({ userId, type });

    // If report doesn't exist, create a new one
    if (!report) {
      report = new Report({ userId, type, unit, data: [] });
    }

    // Push new data entry into the data array
    report.data.push({ date, value });

    // Save the updated report document
    await report.save();

    res.status(201).json(report);
  } catch (err) {
    console.error('Error adding data to report:', err);
    res.status(500).json({ message: 'Failed to add data to report', error: err });
  }
};

// Get Reports Function
const getReports = async (req, res) => {
  try {
    const userId = req.user._id;
    const reports = await Report.find({ userId });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// Update Report Function
const updateReport = async (req, res) => {
  const userId = req.user._id;
  const { type, date, value } = req.body;

  try {
    // Find the report by the user ID and type
    let report = await Report.findOne({ userId, type });

    // If report doesn't exist, return an error
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Push new data entry into the data array
    report.data.push({ date, value });

    // Save the updated report document
    await report.save();

    res.status(200).json(report);
  } catch (err) {
    console.error('Error updating report:', err);
    res.status(500).json({ message: 'Failed to update report', error: err });
  }
};

module.exports = { getReports, createReport, updateReport };
