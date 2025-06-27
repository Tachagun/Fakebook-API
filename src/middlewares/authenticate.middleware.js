import jwt from "jsonwebtoken";
import createError from "../utils/create-error.util.js";
import { getUserBy } from "../services/user.service.js";

export default async function (req, res, next) {
  const authorization = req.headers.authorization;
  console.log(authorization);
  if (!authorization || !authorization.startsWith('Bearer')) {
    createError(401, "✖✖✖✖✖《_NO_AUTH_HEADER_》✖✖✖✖✖");
  }

  const token = authorization.split(' ')[1]

  if (!token) {
  
    createError(401, '✖✖✖✖✖《_UNAUTHORIZED_》✖✖✖✖✖')
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET)
  const foundUser = await getUserBy('id', payload.id)
  if(!foundUser) {
    createError(401, '✖✖✖✖✖《_UNAUTHORIZED_》✖✖✖✖✖')
  }

  const {password, createdAt, updatedAt, ...userData} = foundUser
  req.user = userData

  // res.json({
  //   msg: "✔✔✔✔✔《 AUTH HEADER OK 》✔✔✔✔✔",
  //   token: token,
  //   payload: payload,
  //   foundUser: foundUser
  // });

  next();
}
