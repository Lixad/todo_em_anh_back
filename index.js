require('./mongooseConnection.js');
const { ObjectId } = require('mongoose');
const express = require('express');
const app = express();
const Item = require('./dbModel.js');
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', async (_req, res) => {
  const tasks = await Item.find({}, { value: 1, checked: 1 })
  res.send({ tasks });
});

app.post('/', (req, res) => {
  const item = new Item({
    value: req.body.task
  });
  item.save((err, comment) => {
    if (err) console.log(err);
    else console.log('fallowing comment was saved:', comment);
  });
  res.status(200).send('Task added');
});

app.put('/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, { checked: res.body.checked }, function(err, result){
    if(err){
      res.send(err)
    }
    else{
      res.send(result)
    }
  })
})

app.delete('/:id', async (req, res) => {
  await Item.deleteOne({_id: req.params.id});
  return res.status(200).send('Task deleted');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
