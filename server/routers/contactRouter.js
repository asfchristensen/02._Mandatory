import { Router } from "express";
const router = Router();

// authorization
router.get("/contact", (req, res) => {
    res.send({ message: `Welcome ${req.session.username} to the contact page. Write a mail here` });
});

export default router;