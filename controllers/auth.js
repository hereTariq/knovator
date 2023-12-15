import ErrorHandler from '../utils/errorHandler.js';
import userModel from '../models/user.js';
import catchAsyncError from '../middlewares/catchAsyncError.js';

export const signup = catchAsyncError(async (req, res, next) => {
    const existUser = await userModel.findOne({ email: req.body.email });
    if (existUser) {
        return next(new ErrorHandler(400, 'Email already in use.'));
    }
    const user = await userModel.create(req.body);
    const { password, ...result } = user.toObject();
    res.status(201).json({
        message: 'user created successfully!',
        success: true,
        user: result,
    });
});

export const login = catchAsyncError(async (req, res, next) => {
    const existUser = await userModel.findOne({ email: req.body.email });

    if (!existUser || !(await existUser.matchPassword(req.body.password))) {
        return next(new ErrorHandler(400, 'Email or Password is incorrect'));
    }

    const token = existUser.createJWT();

    const { password, ...result } = existUser.toObject();

    res.status(200).json({
        success: true,
        message: 'LoggedIn successfully',
        user: result,
        token,
    });
});
