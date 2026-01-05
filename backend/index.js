const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const Routes = require('./routes/route.js');

const PORT = process.env.PORT || 5000;

dotenv.config();


app.use(express.json({ limit: '10mb' }));
app.use(cors());


const uri =
  'mongodb+srv://armansingh1196:Arman1196@bit-management-system.g46u2el.mongodb.net/';


const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

async function connectDB() {
  try {
    
    await mongoose.connect(uri, clientOptions);

    
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('NOT CONNECTED TO NETWORK', err);
    process.exit(1); 
  }
}


connectDB().then(() => {
  app.use('/', Routes);

  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
});
