import express from "express";
import {
  authUser,
  getUsers,
  logOutUser,
  registerUser,
} from "../controllers/usercontroller.js";
const router = express.Router();
import { protect } from "../middlewares/protect.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logOutUser);

router.get("/get-users", protect, getUsers);

export default router;
