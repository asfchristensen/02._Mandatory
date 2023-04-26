import { Router } from "express";
const router = Router();

// authorization
router.get("/profile", (req, res) => {
    res.send({ message: `Welcome ${req.session.username} to your profile page` });
});

export default router;