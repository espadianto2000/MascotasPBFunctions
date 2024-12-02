import { Router } from "express";
import { handler1, handler2 } from "./handlers";

const router = Router();

router.get("/handler1", (req, res) => {
  handler1(req, res);
});

router.post("/handler2", (req, res) => {
  handler2(req, res);
});

export default router;
