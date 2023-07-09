import { Request, Response } from 'express';
import ReviewModel from '../models/reviewsModel';
import ProductModel from '../models/productsModel';

export const createReview = async (req: Request, res: Response) => {
  try {
    const { userId, productId, rating, comment } = req.body;

    const review = new ReviewModel({
      user: userId,
      productId,
      rating,
      comment,
    });

    await review.save();

    // Update the product's reviews array with the new review
    await ProductModel.findByIdAndUpdate(productId, {
      $push: { reviews: review._id },
    });

    res.status(201).json({ message: 'Review created successfully', review });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the review by its ID
    const review = await ReviewModel.findById(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Delete the review
    await ReviewModel.findByIdAndDelete(id);

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
