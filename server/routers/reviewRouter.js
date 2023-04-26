import { Router } from "express";
const router = Router();


router.get("/review", (req, res) => {
    res.send({ message: `Hello ${req.session.username} you can write a message here`});
});


export default router;