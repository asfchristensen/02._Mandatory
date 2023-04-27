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

const signinLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, 
    standardHeaders: true,
    legacyHeaders: false,
});
app.use("/auth/signin", signinLimiter);


/* ----------------------------------------------------------  MIDDLEWARE ------------------------------------------------------------------------ */

function authorizationGuard(req, res, next) {
    if (!req.session.username) {
        return res.send({ message: "You are not authorized to see this page" });
    }
    next();
}

app.use("/auth/profile", authorizationGuard);

function adminGuard(req, res, next) {
    if (!req.session.role === 1) {
        return res.send({ message: "You are not authorized to see this page" });
    }
    next();
}

app.use("/auth/employees", authorizationGuard, adminGuard);

function guestGuard(req, res, next) {
    if (!req.session.role === 3) {
        return res.send({ message: "You are not authorized to see this page" });
    }
    next();
}

app.use("/auth/review", authorizationGuard, guestGuard);


/* --------------------------------------------------------  IMPORT ROUTES ----------------------------------------------------------------------- */

import signinRouter from "./routers/signinRouter.js";
app.use(signinRouter);

import profileRouter from "./routers/profileRouter.js";
app.use(profileRouter);

import signupRouter from "./routers/signupRouter.js";
app.use(signupRouter);

import employeeRouter from "./routers/employeeRouter.js";
app.use(employeeRouter);

import reviewRouter from "./routers/reviewRouter.js";
app.use(reviewRouter);


/* ------------------------------------------------------------  PORT ---------------------------------------------------------------------------- */

const PORT = process.env.PORT || 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is running on port ", PORT);
    }
});