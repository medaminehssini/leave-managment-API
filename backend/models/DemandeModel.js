import mongoose from "mongoose";
const demandeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
    },
    date_debut: {
      type: Date,
      required: false,
    },
    date_fin: {
      type: Date,
      required: false,
    },
    nbr_jour: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Demande = mongoose.model("Demande", demandeSchema);

export default Demande;
