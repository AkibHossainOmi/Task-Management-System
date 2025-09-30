require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

connectDB(process.env.MONGO_URI);

const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  const accessLogStream = fs.createWriteStream(
    path.join(logDirectory, 'access.log'),
    { flags: 'a' }
  );
  app.use(morgan('combined', { stream: accessLogStream }));
}

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
