// npx ts-node src/utils/seed.ts to run
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { Store } from '../models/store';
import { Product } from '../models/product';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI as string);
    console.log('MongoDB connected');

    await Store.deleteMany({});
    await Product.deleteMany({});

    const { data: products } = await axios.get('https://fakestoreapi.com/products');

    for (let i = 0; i < 10; i++) {
      const store = new Store({
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        location: faker.location.city(),
        storeImage: faker.image.url(),
      });

      await store.save();

      const productIds: mongoose.Types.ObjectId[] = [];

      for (let j = 0; j < 20; j++) {
        const p = products[Math.floor(Math.random() * products.length)];

        const product = new Product({
          storeId: store._id,
          name: `${p.title} - ${faker.string.alpha(4).toUpperCase()}`,
          description: p.description,
          price: p.price,
          stock: Math.floor(Math.random() * 20) + 1,
          productImage: p.image,
        });

        await product.save();
        productIds.push(product._id as mongoose.Types.ObjectId);
      }

      // Update store with product references
      store.products = productIds;
      await store.save();
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
