import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("고객");
});

export default router;