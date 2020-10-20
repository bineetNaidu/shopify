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
