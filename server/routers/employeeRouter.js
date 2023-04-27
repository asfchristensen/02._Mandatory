import { Router } from "express";
const router = Router();

import db from "../database/connection.js";

router.get("/auth/employees", async (req, res) => {
    const allEmployees = await db.all("SELECT username, email  FROM users WHERE role_id=?", [2]);
    res.send({ data: allEmployees });
});

export default router;