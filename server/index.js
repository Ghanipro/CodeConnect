const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/hi/:name', (req, res) => {
  const { name } = req.params;
  res.json({ message: `Hi, ${name}!` });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
