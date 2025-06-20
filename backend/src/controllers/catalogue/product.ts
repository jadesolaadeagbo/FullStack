import { Request, Response } from "express";
import { Product } from "../../models/product";
import { Store } from "../../models/store";
import mongoose from "mongoose";

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {storeId} = req.params
    const { name, description, price, stock, productImages } = req.body;

    const store = await Store.findById(storeId).populate('products');

    if (!store) {
        res.status(400).json({ 
          status:"404",
          message: "Store not found." });
        return;
      }

    if (!name || price === null || stock === null) {
      res.status(400).json({
        status:"400",
        message: "Product name, price, and stock are required." 
      });
      return;
    }

    const existingProduct = await Product.findOne({ storeId: store._id, name });

    if (existingProduct) {
    res.status(400).json({
        status: "400",
        message: "A product with this name already exists in this store.",
    });
    return;
    }

    const newProduct = new  Product({ 
        storeId: store._id,
        name, 
        description, 
        price, 
        stock, 
        images: productImages || [],
    });

    await newProduct.save();

    store.products.push(newProduct._id as mongoose.Types.ObjectId);
    await store.save();

    res.status(201).json({ 
        status:"201",
        message: "Product created successfully", 
        product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product under store:", error);
    res.status(500).json({ 
      status:"500",
      message: "Internal server error" 
    });
  }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); 

    if(!products){
      res.status(404).json({ 
        status:"404",
        message:"Products not found."
      });
    }

    res.status(200).json({ 
      status:"200",
      message:"Products returned successfully",
      products 
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      status:"500",
      message: "Internal server error" 
    });  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {productId} = req.params;
    const product = await Product.findById(productId);

    if(!product){
      res.status(404).json({ 
        status:"404",
        message: "Product not found." });
      return;
    }
    res.status(200).json({ 
      status:"200",
      message:"Product returned successfully",
      product
    });

  } catch (error) {
    console.error('Error fetching product by id:', error);
    res.status(500).json({ 
      status:"500",
      message: "Internal server error" 
    });  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {productId} = req.params;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(productId, updates, {new:true})

    if(!product){
      res.status(404).json({ 
        status:"404",
        message: "Product does not exist." 
      });
      return;
    }

    res.status(200).json({ 
      status:"200",
      message:"Product updated successfully",
      product
    });

  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ 
      status:"500",
      message: "Internal server error" 
    });  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {productId} = req.params;

    const product = await Product.findByIdAndDelete(productId)

    if(!product){
      res.status(404).json({ 
        status:"404",
        message: "Product does not exist." 
      });
      return;
    }

    res.status(200).json({ 
      status:"200",
      message:"Product deleted successfully",
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ 
      status:"500",
      message: "Internal server error" 
    });  }
};