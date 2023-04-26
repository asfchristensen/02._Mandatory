import { Router } from "express";
const router = Router();

// authorization
router.get("/review", (req, res) => {
    res.send({ message: `Hello ${req.session.username} you can write a review here`});
});

export default router;