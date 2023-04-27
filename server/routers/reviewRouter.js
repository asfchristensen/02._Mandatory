import { Router } from "express";
const router = Router();

// authorization
router.get("/auth/review", (req, res) => {
    res.status(200).send({ message: `Hello ${req.session.username} you can write a review here`});
});

export default router;