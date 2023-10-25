
const mongoose = require('mongoose');
const Task = require('./models/Task'); 
mongoose.connect('mongodb://localhost/react-utility-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  try {
    
    const tasksExist = await Task.exists();
    
    if (!tasksExist) {
      
      await Task.insertMany([
        {
          title: 'Sample Task 1',
          description: 'This is the first task',
        },
        {
          title: 'Sample Task 2',
          description: 'This is the second task',
        },
      ]);
      
      console.log('Database seeded with initial data.');
    } else {
      console.log('Database already contains data. Skipping seeding.');
    }

   
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
});
