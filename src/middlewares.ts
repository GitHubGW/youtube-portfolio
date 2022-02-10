import { Request, Response, NextFunction, RequestHandler } from "express";
import multer from "multer";

export const localsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  res.locals.loggedInUser = {};

  if (req.session.isLoggedIn === true) {
    res.locals.loggedInUser = req.session.loggedInUser;
    res.locals.isLoggedIn = req.session.isLoggedIn;
  }
  return next();
};

export const publicMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session.isLoggedIn === undefined) {
    return next();
  } else {
    req.flash("fail", "로그인하지 않은 사용자만 접근할 수 있습니다.");
    return res.redirect("/");
  }
};

export const privateMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session.isLoggedIn === true) {
    return next();
  } else {
    req.flash("fail", "로그인한 사용자만 접근할 수 있습니다.");
    return res.redirect("/login");
  }
};

export const crossOriginMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
  res.header("Access-Control-Allow-Origin", "*");
  next();
};

export const avatarMulterMiddleware: multer.Multer = multer({ dest: "uploads/avatars/", limits: { fileSize: 20000000 } });

export const videoMulterMiddleware = multer({ dest: "uploads/videos/", limits: { fileSize: 50000000 } }).fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);
