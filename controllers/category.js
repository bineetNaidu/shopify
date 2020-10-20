import Category from '../model/Category.js';

export const getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.json({
    success: true,
    length: categories.length,
    categories,
  });
};

export const createCategory = async (req, res) => {
  const category = await new Category(req.body).save();
  res.json({
    success: true,
    length: category.length,
    category,
  });
};
