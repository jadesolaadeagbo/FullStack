import { Request, Response } from 'express';
import { Store } from '../../models/store';

export const createStore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, location, storeImage } = req.body;

    if (!name) {
      res.status(400).json({
        status: '400',
        message: 'Store name is required.',
      });
      return;
    }

    const existingStore = await Store.findOne({ name });

    if (existingStore) {
      res.status(400).json({
        status: '400',
        message: 'A store with this name already exists.',
      });
      return;
    }

    const newStore = new Store({
      name,
      description,
      location,
      storeImage,
    });

    await newStore.save();

    res.status(201).json({
      status: '201',
      message: 'Store created successfully',
      store: newStore,
    });
  } catch (error) {
    console.error('Error creating store:', error);
    res.status(500).json({
      status: '500',
      message: 'Internal server error',
    });
  }
};

export const getAllStores = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [stores, total] = await Promise.all([
      Store.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Store.countDocuments(),
    ]);

    if (!stores.length) {
      res.status(404).json({
        status: '404',
        message: 'Stores not found.',
      });
    }

    res.status(200).json({
      status: '200',
      message: 'Stores returned successfully',
      stores,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).json({
      status: '500',
      message: 'Internal server error',
    });
  }
};

// Unpaginated version
// export const getAllStores = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const stores = await Store.find().sort({ createdAt: -1 }).populate('products');
//     res.status(200).json({
//       status: '200',
//       message: 'Stores returned successfully',
//       stores,
//     });
//   } catch (error) {
//     console.error('Error fetching stores:', error);
//     res.status(500).json({
//       status: '500',
//       message: 'Internal server error',
//     });
//   }
// };

export const getStoreById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeId } = req.params;
    const store = await Store.findById(storeId).populate('products');

    if (!store) {
      res.status(404).json({
        status: '404',
        message: 'Store not found.',
      });
      return;
    }
    res.status(200).json({
      status: '200',
      message: 'Store returned successfully',
      store,
    });
  } catch (error) {
    console.error('Error fetching store by id:', error);
    res.status(500).json({
      status: '500',
      message: 'Internal server error',
    });
  }
};

export const updateStore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeId } = req.params;
    const updates = req.body;

    const store = await Store.findByIdAndUpdate(storeId, updates, { new: true });

    if (!store) {
      res.status(404).json({
        status: '404',
        message: 'Store does not exist.',
      });
      return;
    }

    res.status(200).json({
      status: '200',
      message: 'Store updated successfully',
      store,
    });
  } catch (error) {
    console.error('Error updating store:', error);
    res.status(500).json({
      status: '500',
      message: 'Internal server error',
    });
  }
};

export const deleteStore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeId } = req.params;

    const store = await Store.findByIdAndDelete(storeId);

    if (!store) {
      res.status(404).json({
        status: '404',
        message: 'Store does not exist.',
      });
      return;
    }

    res.status(200).json({
      status: '200',
      message: 'Store deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting store:', error);
    res.status(500).json({
      status: '500',
      message: 'Internal server error',
    });
  }
};
