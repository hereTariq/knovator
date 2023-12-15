import { Schema, model } from 'mongoose';

const pointSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            index: true,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
            default: true,
        },
        location: {
            type: pointSchema,
            required: true,
        },
    },
    { timestamps: true }
);
postSchema.index({ location: '2dsphere' });
const postModel = model('Post', postSchema);

export default postModel;
