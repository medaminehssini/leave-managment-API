import User from "../models/UserModel.js";
import Demande from "../models/DemandeModel.js";

import asyncHandler from "express-async-handler";

import { types } from "../utils/constance.js";
import { sendEmail, sendSMS } from "../utils/emailConfig.js";

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
  const { type, nbr_jour, date_debut, date_fin } = req.body;

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
      date_debut,
      date_fin,
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

//@desc   Register a new user
//@routes POST api/users
//@access Public
const getUserRest = asyncHandler(async (req, res) => {
  const rtt = await getRestDemande(req.user._id, "RTT");
  const Paid = await getRestDemande(req.user._id, "Paid");
  const Maternity = await getRestDemande(req.user._id, "Maternity");
  const Paternity = await getRestDemande(req.user._id, "Paternity");

  res.status(201);
  res.json({
    RTT: 15 - rtt,
    Paid: 30 - Paid,
    Maternity: 60 - Maternity,
    Paternity: 3 - Paternity,
  });
});

const getRestDemande = async (userId, type) => {
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
  return allDay;
};

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
  const demandes = await Demande.find({}).populate("user");
  res.json(demandes);
});

//@desc   Delete user
//@routes PUT api/users/:id
//@access private/admin
const accepteDemande = asyncHandler(async (req, res) => {
  const demande = await Demande.findById(req.params.id).populate("user");

  if (demande) {
    demande.status = "accepted";
    await demande.save();

    await sendSMS("Votre congé a été accepté");

    sendEmail(
      demande.user.email,
      "Votre congé a été accepté",
      "Votre congé a été accepté"
    );

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
  const demande = await Demande.findById(req.params.id).populate("user");

  if (demande) {
    demande.status = "refused";
    await demande.save();
    await sendSMS("Votre congé a été refusé");

    sendEmail(
      demande.user.email,
      "Votre congé a été refusé",
      "Votre congé a été refusé"
    );

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
  getUserRest,
};
