import { Router } from 'express';
import validate from '../middlewares/validate.js';

const router = Router();
import {
    allPosts,
    createPost,
    deletePost,
    getPostByLocation,
    postCount,
    updatePost,
} from '../controllers/posts.js';
import { postValidation } from '../validations/postValidation.js';
import { isAdmin } from '../middlewares/isAdmin.js';

router.post('/create', validate(postValidation), createPost);
router.get('/all', allPosts);
router.patch('/update/:postId', isAdmin, updatePost);
router.delete('/delete/:postId', isAdmin, deletePost);
router.get('/', getPostByLocation);
router.get('/count', postCount);

export default router;
