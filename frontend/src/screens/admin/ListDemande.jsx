import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  accepteDemande,
  getAllDemande,
  refuseDemande,
} from "../../actions/demandeAction";

import Loader from "../../components/Loader";
import Message from "../../components/Message";

const ListDemande = () => {
  const dispatch = useDispatch();

  const demandeAll = useSelector((state) => state.adminListDemande);
  const { loading, error, demandes } = demandeAll;

  const adminAccepteDemande = useSelector((state) => state.adminAccepteDemande);
  const { loading: loadingAccept, error: errorAccept } = adminAccepteDemande;

  const adminRefuseDemande = useSelector((state) => state.adminRefuseDemande);
  const { loading: loadingRefuse, error: errorRefuse } = adminRefuseDemande;

  useEffect(() => {
    dispatch(getAllDemande());
  }, [dispatch]);

  const acceptUserDemande = (id) => {
    dispatch(accepteDemande(id));
  };

  const refuseUserDemande = (id) => {
    dispatch(refuseDemande(id));
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>ListDemande</h1>

      <div>
        {error && <Message variant="danger"></Message>}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {demandes.map((demande, index) => {
              return (
                <div className="form-check" key={index * 3}>
                  <label className="form-check-label">
                    {demande.user.name}
                  </label>
                  <label className="form-check-label">
                    |{demande.nbr_jour}
                  </label>
                  <label className="form-check-label">|{demande.type}</label>
                  <label className="form-check-label">|{demande.status}</label>
                  <button
                    onClick={() => {
                      acceptUserDemande(demande._id);
                    }}
                  >
                    accept
                  </button>
                  <button
                    onClick={() => {
                      refuseUserDemande(demande._id);
                    }}
                  >
                    refuse
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListDemande;
