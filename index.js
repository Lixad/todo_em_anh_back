const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const fs = require('fs');

app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  res.send(data.tasks);
});

app.post('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  if (data.tasks.find(e => e.name === req.body.task)) return res.status(400).send('Task already exist');
  data.tasks.push({
    name: req.body.task,
    checked: false,
    id: data.tasks.length ? data.tasks[data.tasks.length - 1].id + 1 : 0
  });
  console.log(data);
  fs.writeFileSync('data.json', JSON.stringify(data));
  res.status(200).send('Task added');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
