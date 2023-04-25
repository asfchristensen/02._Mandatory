import { Router } from "express";
const router = Router();

import bcrypt from "bcrypt";
import db from "../database/connection.js";


// authentication
router.post("/auth/login", async (req, res, next) => {
    const { username, password, email } = req.body;



    const validUser = await db.get("SELECT * FROM users WHERE email=?", [email]);
    console.log("Valid user: ", validUser);

    if (!validUser) {
        return res.send({ message: "User does not exist" });
    }

    const validPassword = await bcrypt.compare(password, validUser.password);

    if (!validPassword) {
        return res.send({ message: "Incorrect password" });
    }

    req.session.username = validUser.username;
    req.session.email = validUser.email;
    req.session.role = validUser.role_id;
    console.log(req.session);

    res.send(req.session);
});


router.get("/auth/logout", (req, res) => {
    req.session.destroy(() => {
        res.send({ message: "You are logged out." });
    });
});


export default router;