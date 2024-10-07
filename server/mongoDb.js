const {MongoClient} = require('mongodb');

const url =
  'mongodb+srv://ms0319255:JVCeC4A21qxvT6y1@moodify.nsvyj.mongodb.net/?retryWrites=true&w=majority&appName=Moodify';

const client = new MongoClient(url);
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}

connectToMongoDB();

module.exports = client;
