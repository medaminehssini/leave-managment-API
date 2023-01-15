import express from "express";
import {
  getUserDemande,
  addUserDemande,
  updateUserDemande,
  getDemandes,
  accepteDemande,
  refuseDemande,
  getUserRest,
} from "../controllers/demandeController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// private route
router.get("/user", protect, getUserDemande);
router.post("/user", protect, addUserDemande);
router.get("/user/stats", protect, getUserRest);
router.put("/user/:id", protect, updateUserDemande);

router.get("/", protect, admin, getDemandes);
router.post("/:id", protect, admin, accepteDemande);
router.put("/:id", protect, admin, refuseDemande);

export default router;
