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
  const product = await new Product(req.body).save();
  res.json({
    success: true,
    length: product.length,
    product,
  });
};

export const getProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.pID }).populate(
    'reviews'
  );
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
  res.redirect(`/api/p/${product._id}`);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.pID });
  await product.remove();
  res.redirect(`/api/p`);
};
