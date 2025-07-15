// npx ts-node src/utils/seed.ts to run 
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { Store } from '../models/store';
import { Product } from '../models/product';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI as string);
    console.log('MongoDB connected');

    await Store.deleteMany({});
    await Product.deleteMany({});

    for (let i = 0; i < 10; i++) {
      const store = new Store({
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        location: faker.location.city(),
        storeImage: faker.image.url(),
      });

      await store.save();

      const productIds: mongoose.Types.ObjectId[] = [];

      for (let j = 0; j < 5; j++) {
        const product = new Product({
          storeId: store._id,
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price({ min: 10, max: 100 })),
          stock: faker.number.int({ min: 1, max: 100 }),
          productImage: faker.image.url(),
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
