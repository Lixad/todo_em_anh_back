const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
    value: { type: String, unique: true, required: true },
    checked: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
});

module.exports = model('Item', itemSchema);
