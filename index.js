const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const fs = require('fs');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  res.send(data.tasks);
});

app.post('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  if (data.tasks.find(e => e === req.body.task)) return res.status(400).send('Task already exist');
  data.tasks.push(req.body.task);
  fs.writeFileSync('data.json', JSON.stringify(data));
  res.status(200).send('Task added');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
