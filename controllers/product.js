import Category from '../model/Category.js';
import Product from '../model/Product.js';

export const getProducts = async (_, res) => {
  const products = await Product.find({});
  res.json({
    success: true,
    length: products.length,
    products,
  });
};

export const createProduct = async (req, res) => {
  if (req.query.c) {
    const category = await Category.findOne({ _id: req.query.c });
    const newProduct = { ...req.body, category: category._id };
    const product = new Product(newProduct);
    category.products.push(product._id);
    await category.save();
    await product.save();
    res.json({
      success: true,
      length: product.length,
      product,
    });
  } else {
    res.json({ success: false, msg: 'No Category Found' });
  }
};

export const getProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.pID });
  res.json({
    success: true,
    length: product.length,
    product,
  });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.pID },
    { ...req.body }
  );
  res.json({
    success: true,
    length: product.length,
    product,
  });
};
