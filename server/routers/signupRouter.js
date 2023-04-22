import { Router } from "express";
const router = Router();

import bcrypt from "bcrypt";
import db from "../database/connection.js";
import { sendSignupConfirmation } from "../util/nodeMailer.js";

router.post("/signup", async (req, res) => {
    const { username, password, email } = req.body;

    const userExists = await db.get("SELECT * FROM users WHERE email=?", [email]);

    if (!userExists) {
        const hashedPassword = await bcrypt.hash(password, 12);
        db.run("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [username, hashedPassword, email]);

        // send mail with nodemailer
        sendSignupConfirmation(username, email).catch(console.error);

        res.status(200).send({ message: 1 });
    } else {
        res.status(409).send({ message: 2 });
    }
});

export default router;