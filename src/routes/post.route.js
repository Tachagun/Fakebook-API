import express from 'express'
const postRoute = express.Router()
import * as postController from '../controllers/post.controller.js'
import upload from '../middlewares/upload.middleware.js'

postRoute.get('/', postController.getAllposts)
postRoute.post('/', upload.single('image'), postController.createPost)
postRoute.put('/', postController.updatePost)
postRoute.delete('/', postController.deletePost)


export default postRoute