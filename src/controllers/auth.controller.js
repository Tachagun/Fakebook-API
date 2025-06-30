import prisma from "../config/prisma.config.js";
import jwt from 'jsonwebtoken' 
import checkIdentity from "../utils/check-identity.util.js";
import createError from "../utils/create-error.util.js";
import bcrypt from "bcryptjs";
import { createUser, getUserBy } from "../services/user.service.js";

export async function register(req, res, next) {
  try {
    const { identity, firstName, lastName, password, confirmPassword } =
      req.body;
    //validation
    if (
      !(
        identity.trim() &&
        firstName.trim() &&
        lastName.trim() &&
        password.trim() &&
        confirmPassword.trim()
      )
    ) {
      createError(400, "Please fill all data!!!");
    }
    if (password !== confirmPassword) {
      createError(400, "Please confirm your passwords !!!");
    }
    // identity email or mobile : checkIdentity(identity) => String : 'email' | 'mobile'
    const identityKey = checkIdentity(identity);

    // find User
    const foundUser = await prisma.user.findUnique({
      where: { [identityKey]: identity },
    });
    if (foundUser) {
      createError(409, `Already have this user: ${identity}`);
    }

    const newUser = {
      [identityKey]: identity,
      password: await bcrypt.hash(password, 10),
      firstName: firstName,
      lastName: lastName,
    };

    const result = await prisma.user.create({
      data: newUser,
    });

    res.json({
      message: `Register Success, Welcome User ≪ ${result.firstName} ${result.lastName} ≫ to FakeTaxi `,
      body: result,
    });
  } catch (err) {
    next(err);
  }
}

export async function registerYup(req, res, next) {
  console.log(req.body)
  try {
    const {email, mobile, firstName, lastName, password} = req.body
    // find user
    if (email) {
      let foundUserEmail = await getUserBy("email", email)
      if(foundUserEmail) createError(409,`Email:《 ${email} 》has already been used by another user!`)
    }
    if (mobile) {
      let foundUserMobile = await getUserBy("mobile", mobile)
      if(foundUserMobile) createError(409,`Mobile number:《 ${mobile} 》has already been used by another user!`)
    }
    const newUser = {
      email,
      mobile,
      password: await bcrypt.hash(password, 10),
      firstName,
      lastName
    }
    await createUser(newUser)

    res.json({message: `Registeration Success! Welcome User ≪ ${newUser.firstName} ${newUser.lastName} ≫ to FakeTaxi`})
  }catch(err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  const {identity, password, email, mobile} = req.body
  const identityKey = email ? 'email' : 'mobile'

  const foundUser = await getUserBy(identityKey, identity)

  if(!foundUser) {
    createError(401, 'Invalid Login')
  }
  let pwOk = await bcrypt.compare(password, foundUser.password)
  if(!pwOk) {
    createError(401, 'Invalid Login')
  }
  // create web token
  const payload = {id: foundUser.id}
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '15d'
    // expiresIn: '10s'
  })

  const { password : pw, createdAt, updatedAt, ...userData } = foundUser

  res.json({
    message: `Login Success!! Welcome back,『 ${foundUser.firstName} ${foundUser.lastName} 』`,
    token: token,
    user: userData
  });
};

export const getMe = async (req, res, next) => {
  res.json({ user: req.user });
};

// export const getMe = (title) => {
//   return (req, res, next) => {
//     res.json({
//       msg: title,
//     });
//   };
// };
