// import UserToken from "../models/UserToken";
// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction, Router } from "express";
// import passport from "passport";


// const LoginRouter = Router();

// const login = async (req: Request, res: Response, next: NextFunction) => {
//     passport.authenticate(
//         "login",
//         async (err: any, user: UserToken) => {
//             try {
//                 if (err || !user) {
//                     const error = new Error("An error occurred.");
//                     return next(error);
//                 }
//             }

//             req.login(
//                 user,
//                 { session: false },
//                 async (error) => {
//                     if (error) return next(error);

//                     const body = { email: user.email, passport: user.password };
//                     const token = jwt.sign({ user: body}, process.env.SECRET_KEY as string);

//                     return res.json({ token });
//                 }
//             );
//         } catch (error) {
//             return next(error);
//         }
//     )(req, res, next);
// };

// LoginRouter.post("/", login);

// export default LoginRouter;
