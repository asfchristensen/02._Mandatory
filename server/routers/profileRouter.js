import { Router } from "express";
const router = Router();

// authorization
router.get("/auth/profile", (req, res) => {
    res.status(200).send({ message: `Welcome ${req.session.username} to your page` });
});

export default router;