import catchAsyncError from './catchAsyncError.js';
import postModel from '../models/post.js';
import ErrorHandler from '../utils/errorHandler.js';

export const isAdmin = catchAsyncError(async (req, res, next) => {
    const post = await postModel.findById(req.params.postId);
    if (post.createdBy !== req.user._id) {
        return next(
            new ErrorHandler(
                403,
                'Forbidden, You can not perform this operation.'
            )
        );
    }
    next();
});
