import express from 'express'
import * as dotenv from 'dotenv'
import auth from '../middleware/auth.js'

import Post from '../mongoDB/models/post.js'

dotenv.config();

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const username = req.query.username;
        const allPosts = await Post.find(username && { username });
        return res.status(201).json(allPosts)
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
        return res.status(201).json(post)
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
});

router.post("/add", async (req, res) => {
    try {
        const {
            title,
            desc,
            content,
            img,
            username
        } = req.body;

        const newPost = await Post.create({
            title,
            desc,
            content,
            img,
            username,
        })
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Error in creating the post' })
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {
            title,
            desc,
            content,
            img
        } = req.body;

        const foundPost = await Post.findById(id);

        if (!foundPost) {
            return res.status(404).json({ error: 'No such Post with this id' })
        }

        foundPost.title = title;
        foundPost.desc = desc;
        foundPost.content = content;
        foundPost.img = img;

        await foundPost.save();

        return res.status(201).json(foundPost)

    } catch (error) {
        res.status(500).json({ error: 'Unable to update' });
    }
})

router.delete('/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        await Post.findByIdAndDelete(id);
        res.status(201).json({ message: 'Successfully deleted the post' })
    } catch (error) {
        res.status(500).json({ error: 'Error in deleting the post' })
    }
});

export default router;