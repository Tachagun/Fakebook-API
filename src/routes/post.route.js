import express from 'express'
const postRoute = express.Router()
import * as postController from '../controllers/post.controller.js'
import upload from '../middlewares/upload.middleware.js'

postRoute.get('/', postController.getAllposts)
postRoute.post('/', upload.single('image'), postController.createPost)
postRoute.put('/:id',upload.single('image'), postController.updatePost)
postRoute.delete('/:id', postController.deletePost)


export default postRoute