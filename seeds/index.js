import mongoose from 'mongoose';
import Product from '../model/Product.js';
import Review from '../model/Review.js';
import faker from 'faker';

mongoose.connect('mongodb://localhost:27017/shopify', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const seedDB = async () => {
  await Product.deleteMany({});
  await Review.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const price = Math.floor(Math.random() * 20) + 10;
    const name = faker.lorem.words();
    const images =
      'https://images.unsplash.com/photo-1592921870583-aeafb0639ffe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60';
    const description = faker.lorem.sentence();
    const category = 'Electronics';
    const product = new Product({ price, name, images, description, category });

    for (let k = 0; k < 5; k++) {
      const rating = faker.random.number(5);
      const comment = faker.lorem.sentence();
      const review = new Review({
        rating,
        comment,
        user: '5f92a97085199016a1493041',
      });
      await product.reviews.push(review._id);
      await review.save();
    }

    await product.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
