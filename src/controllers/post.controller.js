import cloudinary from "../config/cloudinary.config.js"
import path from 'path'
import fs from 'fs/promises'
import prisma from "../config/prisma.config.js"



export const getAllposts = async (req, res, nex) => {
  res.json({message: "Get all posts"})
}

export const createPost = async (req, res, nex) => {
  const {message} = req.body
  console.log(req.file)
  let haveFile = !!req.file
  let uploadResult = null
  if (haveFile) {
    uploadResult = await cloudinary.uploader.upload(req.file.path, {
      overwrite: true,
      public_id: path.parse(req.file.path).name
    })
    fs.unlink(req.file.path)
  }
  const data = {
    message: message,
    image: uploadResult.secure_url,
    userId: req.user.id
  }
  const rs = await prisma.post.create({data})


  console.log(uploadResult)
  res.json({
    message: "Post created~",
    result : rs
  })
}

export const updatePost = async (req, res, nex) => {
  res.json({message: "update post"})
}

export const deletePost = async (req, res, nex) => {
  res.json({message: "Delete post"})
}