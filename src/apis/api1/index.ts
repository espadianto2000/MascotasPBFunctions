import { Router } from "express";
import {
  handlerCreate,
  handlerDelete,
  handlerJoin,
  handlerLeave,
} from "./handlers";

const router = Router();

router.post("/create-group", (req, res) => {
  handlerCreate(req, res);
});

router.post("/delete-group", (req, res) => {
  handlerDelete(req, res);
});

router.post("/join-group", (req, res) => {
  handlerJoin(req, res);
});

router.post("/leave-group", (req, res) => {
  handlerLeave(req, res);
});

export default router;
