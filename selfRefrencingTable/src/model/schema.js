import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  name: String,
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
});

const Person = mongoose.model('Person', personSchema);

export {Person};
