import Review from '../model/Review.js';
import Product from '../model/Product.js';

export const createReview = async (req, res) => {
  const review = new Review(req.body);
  const product = await Product.findOne({ _id: req.params.pID });
  product.reviews.push(review._id);
  await product.save();
  await review.save();
  res.redirect(`/api/p/${product._id}`);
};

export const deleteReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.rID });
  const product = await Product.findOneAndUpdate(
    { _id: req.params.pID },
    { $pull: { reviews: review._id } }
  );
  await review.remove();
  res.redirect(`/api/p/${product._id}`);
};
