import cloudinary from "../config/cloudinary.config.js";
import path from "path";
import fs from "fs/promises";
import prisma from "../config/prisma.config.js";
import createError from "../utils/create-error.util.js";

export const getAllposts = async (req, res, nex) => {
  const resp = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
        },
      },
      comments: true,
      likes: true,
    },
  });
  res.json({ posts: resp });
};

export const createPost = async (req, res, nex) => {
  const { message } = req.body;
  console.log(req.file);
  let haveFile = !!req.file;
  let uploadResult = null;
  if (haveFile) {
    uploadResult = await cloudinary.uploader.upload(req.file.path, {
      overwrite: true,
      public_id: path.parse(req.file.path).name,
    });
    fs.unlink(req.file.path);
  }
  const data = {
    message: message,
    image: uploadResult?.secure_url || "",
    userId: req.user.id,
  };
  const rs = await prisma.post.create({ data });

  console.log(uploadResult);
  res.json({
    message: "Post created~~~",
    result: rs,
  });
};

export const updatePost = async (req, res, nex) => {
  const { id } = req.params;
  const { message, removePic } = req.body;
  const foundPost = await prisma.post.findUnique({
    where: { id: +id },
  });
  if (!foundPost || req.user.id !== foundPost.userId) {
    createError(400, "Unable to edit this post");
  }
  const haveFile = !!req.file;
  let uploadResult;
  if (haveFile) {
    (uploadResult = await cloudinary.uploader.upload(req.file.path)),
      {
        overwrite: true,
        public_id: path.parse(req.file.path).name,
      };
    fs.unlink(req.file.path);
  }
  const data = haveFile
    ? { message, image: uploadResult.secure_url, userId: req.user.id }
    : { message, userId: req.user.id, image: removePic ? "" : foundPost.image };
  const rs = await prisma.post.update({
    where: { id: +id },
    data: data,
  });

  res.json({ message: "Post Updated~~" });
};

export const deletePost = async (req, res, nex) => {
  const { id } = req.params;
  const foundPost = await prisma.post.findUnique({
    where: { id: +id },
  });
  if (!foundPost) {
    createError(400, "post-id not found");
  }
  if (req.user.id !== foundPost.userId) {
    createError(400, "[INVALID PERMISSION] Unable to delete this post.");
  }
  const resp = await prisma.post.delete({ where: { id: +id } });

  res.json({ message: "Post Deleted~~" });
};
