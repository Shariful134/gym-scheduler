import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Gym Sheduler server is running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
