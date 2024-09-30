import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the item'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the item'],
  },
});

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
