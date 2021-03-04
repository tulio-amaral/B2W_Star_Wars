import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/B2W_StarWars', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}).then(() => console.log('DB connected'));