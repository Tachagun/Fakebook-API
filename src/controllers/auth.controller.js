export function register(req, res, next) {
  res.json({
    msg: "Register controller",
    body: req.body,
  });
}

export const login = (req, res, next) => {
  res.json({
    msg: "Login controller",
    body: req.body,
  });
};

export const getMe = (req, res, next) => {
  res.json({
    msg: "GetMe controller",
  });
};

// export const getMe = (title) => {
//   return (req, res, next) => {
//     res.json({
//       msg: title,
//     });
//   };
// };
