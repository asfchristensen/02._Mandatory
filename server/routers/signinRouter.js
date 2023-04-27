import { Router } from "express";
const router = Router();

import bcrypt from "bcrypt";
import db from "../database/connection.js";

// authentication
router.post("/auth/signin", async (req, res) => {
    const { password, email } = req.body;

    const user = await db.get("SELECT * FROM users WHERE email=?", [email]);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({ message: "Invalid email or password" });
    }

    req.session.username = user.username;
    req.session.email = user.email;
    req.session.role = user.role_id;

    res.status(200).send(req.session);
});


router.get("/auth/signout", (req, res) => {
    req.session.destroy(() => {
        res.status(200).send({ message: "You are logged out" });
    });
});

export default router;