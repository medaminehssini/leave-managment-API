import User from "../models/UserModel.js";
import Demande from "../models/DemandeModel.js";

import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { types } from "../utils/constance.js";

//@desc  get user demande
//@routes GET api/users/demande
//@access Private
const getUserDemande = asyncHandler(async (req, res) => {
  const demandes = await Demande.find({ user: req.user._id });
  res.status(200);
  res.json(demandes);
});

//@desc   Register a new user
//@routes POST api/users
//@access Public
const addUserDemande = asyncHandler(async (req, res) => {
  const { type, nbr_jour } = req.body;

  const verif = await verifDemande(
    req.user._id,
    type,
    nbr_jour,
    req.user.workingWeek
  );
  console.log(verif);
  if (verif) {
    const demande = new Demande({
      user: req.user._id,
      type,
      nbr_jour,
      status: "en progress",
    });

    const createdDemande = await demande.save();
    res.status(201);
    res.json(createdDemande);
  } else {
    res.status(400);
    res.json({
      error: "not allowed",
    });
  }
});

const verifDemande = async (userId, type, nbr_jour, workingWeek) => {
  const dateDebut = new Date().getFullYear() + "-01-" + "01";
  const dateFin = new Date().getFullYear() + "-12-" + "31";

  const demandes = await Demande.aggregate([
    {
      $match: {
        user: userId,
        type,
        status: "accepted",
        createdAt: { $gte: new Date(dateDebut), $lte: new Date(dateFin) },
      },
    },
    {
      $group: { _id: null, allDay: { $sum: "$nbr_jour" } },
    },
  ]);

  let allDay = demandes[0] != null ? demandes[0].allDay : 0;
  if (type == "RTT" && workingWeek < 35) {
    return false;
  }

  if (allDay + nbr_jour > types[type]) {
    return false;
  } else {
    return true;
  }
};

//@desc   Update user profile
//@routes PUT api/users/profile
//@access private
const updateUserDemande = asyncHandler(async (req, res) => {
  const { type, nbr_jour } = req.body;
  const demande = await Demande.findById(req.params.id);

  if (demande) {
    demande.type = type || demande.type;
    demande.nbr_jour = nbr_jour || demande.nbr_jour;
    const updatedDemande = await demande.save();
    res.json(updatedDemande);
  } else {
    res.status(404);
    throw new Error("Demande not found ");
  }
});

//@desc   Get all user
//@routes PUT api/users
//@access private /admin
const getDemandes = asyncHandler(async (req, res) => {
  const demandes = await Demande.find({});
  res.json(demandes);
});

//@desc   Delete user
//@routes PUT api/users/:id
//@access private/admin
const accepteDemande = asyncHandler(async (req, res) => {
  const demande = await Demande.findById(req.params.id);

  if (demande) {
    demande.status = "accepted";
    await demande.save();
    res.json({ message: "Demande a été acceptée!" });
  } else {
    res.status(404);
    throw new Error("Demande not found ");
  }
});

//@desc   Delete user
//@routes PUT api/users/:id
//@access private/admin
const refuseDemande = asyncHandler(async (req, res) => {
  const demande = await Demande.findById(req.params.id);

  if (demande) {
    demande.status = "refused";
    await demande.save();
    res.json({ message: "Demande a été refusée!" });
  } else {
    res.status(404);
    throw new Error("Demande not found ");
  }
});

export {
  getUserDemande,
  addUserDemande,
  refuseDemande,
  accepteDemande,
  getDemandes,
  updateUserDemande,
};