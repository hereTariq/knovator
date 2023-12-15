import ErrorHandler from '../utils/errorHandler.js';
import postModel from '../models/post.js';
import catchAsyncError from '../middlewares/catchAsyncError.js';

export const createPost = catchAsyncError(async (req, res, next) => {
    const newPost = await postModel.create({
        createdBy: req.user._id,
        ...req.body,
    });

    res.status(201).json({
        message: 'post created successfully',
        success: true,
        post: newPost,
    });
});

export const allPosts = catchAsyncError(async (req, res, next) => {
    const posts = await postModel.find();
    if (posts.length == 0) {
        return res.status(200).json({
            message: 'No post found, please create one.',
            success: true,
        });
    }
    res.status(200).json({
        message: 'posts fetched successfully',
        success: true,
        posts,
    });
});

export const updatePost = catchAsyncError(async (req, res, next) => {
    const postId = req.params.postId;
    if (!postId) {
        return next(
            new ErrorHandler(400, 'please provide the postId as param.')
        );
    }
    const updatedPost = await postModel.findByIdAndUpdate(postId, req.body, {
        new: true,
    });
    res.status(200).json({
        message: 'post updated successfully',
        success: true,
        updatedPost,
    });
});
export const deletePost = catchAsyncError(async (req, res, next) => {
    const postId = req.params.postId;
    if (!postId) {
        return next(
            new ErrorHandler(400, 'please provide the postId as param.')
        );
    }
    const deletedPost = await postModel.findByIdAndDelete(postId);
    res.status(200).json({
        message: 'post deleted successfully',
        success: true,
        deletedPost,
    });
});

export const getPostByLocation = catchAsyncError(async (req, res, next) => {
    const { lat, lon } = req.query;
    const post = await postModel.find({
        location: {
            $near: {
                $geometry: { type: 'Point', coordinates: [lon, lat] },
                $maxDistance: 500, // distance is in meters
            },
        },
    });
    if (!post) {
        return res.status(404).json({
            message: 'No post found with this longitude and latitude',
        });
    }
    res.status(200).json({
        message: 'post fetched successfully',
        success: true,
        post,
    });
});

export const postCount = catchAsyncError(async (req, res, next) => {
    const activePostsCount = await postModel.countDocuments({ status: true });
    const inactivePostsCount = await postModel.countDocuments({
        status: false,
    });
    res.status(200).json({ activePostsCount, inactivePostsCount });
});
