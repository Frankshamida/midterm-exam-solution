// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/database');

// Initialize Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool
});

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active'
  }
});

// Sync the model with the database
sequelize.sync()
  .then(() => {
    console.log('Database & tables synced!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

module.exports = { User };

// app.js
const express = require('express');
const { User } = require('./models/index');

const app = express();
const PORT = 3000;

// Route to fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});