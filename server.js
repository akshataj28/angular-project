const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // To parse JSON bodies

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
