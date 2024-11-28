import 'dotenv/config';
import { createServer } from './app';
import mongoose from 'mongoose';

const DB = process.env.DB

mongoose.connect('mongodb://0.0.0.0:27017/toolkit')
.then(()=>{
    console.log('MongoDB Connected!')
})
.catch((err) => console.error('MongoDB connection error:', err));

const server = createServer();
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log();
  console.log(`Api running on ${port}`);
});
