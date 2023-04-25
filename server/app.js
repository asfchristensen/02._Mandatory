/* -------------------------------------------------------------  DOTENV ---------------------------------------------------------------------------- */

import dotenv from "dotenv"; 
dotenv.config();


/* ------------------------------------------------------------  EXPRESS ---------------------------------------------------------------------------- */

import express from "express";
const app = express();

app.use(express.json());


/* -------------------------------------------------------------  HELMET ---------------------------------------------------------------------------- */

import helmet  from "helmet";
app.use(helmet());


/* --------------------------------------------------------------  CORS ----------------------------------------------------------------------------- */

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));


/* ------------------------------------------------------------  SESSION --------------------------------------------------------------------------- */

import session from "express-session";

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: true,
    cookie: { secure: false } 
  }));


/* ---------------------------------------------------  RATE-LIMIT ON ENDPOINTS  ------------------------------------------------------------------ */

import rateLimit from 'express-rate-limit'

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true, 
    legacyHeaders: false,
});
app.use(apiLimiter);

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many login attempts, please try again after 15 minutes",
    keyGenerator: (req, res) => req.rateLimitKey
});
app.use("/auth/login", loginLimiter);


/* ----------------------------------------------------------  MIDDLEWARE ------------------------------------------------------------------------ */

function authChecker(req, res, next) {
    console.log("In authchecker .. ");
    if (!req.session.username) {
        return res.send({ message: "You are not allowed to see this page. Please login" });
    }
    next();
}

app.use("/contact", authChecker);


/* --------------------------------------------------------  IMPORT ROUTES ----------------------------------------------------------------------- */

import authRouter from "./routers/authRouter.js";
app.use(authRouter);

import contactRouter from "./routers/contactRouter.js";
app.use(contactRouter);

import signupRouter from "./routers/signupRouter.js";
app.use(signupRouter);


/* ------------------------------------------------------------  PORT ---------------------------------------------------------------------------- */

const PORT = process.env.PORT || 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is running on port ", PORT);
    }
});