import { useEffect, useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserDemande, userAddDemande } from "../../actions/demandeAction";
import { toastAlert } from "../../utils/alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexWrap: "wrap",
};

const Calendar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [conge, setConge] = useState("");
  const [selected, setSelected] = useState();

  const [listDemandes, setListDemande] = useState([]);

  const userAddD = useSelector((state) => state.userAddDemande);
  const {
    success: successADD,
    error: errorAdd,
    loading: loadingAdd,
  } = userAddD;

  const userDemande = useSelector((state) => state.userDemande);
  const { success, loading, demandes } = userDemande;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getUserDemande());
  }, [dispatch]);

  const getColor = (event) => {
    const t = conges.filter((e) => (e.label === event.title ? e.color : ""));
    return t.length > 0 ? t[0].color : "green";
  };
  useEffect(() => {
    let list = [];
    if (demandes.length > 0) {
      demandes.map((demande) => {
        const t = conges.filter((e) =>
          e.label === demande.type ? e.color : ""
        );
        if (demande.date_fin) {
          list.push({
            id: demande._id,
            title: demande.type,
            start: demande.date_debut,
            status: demande.status,
            end: demande.date_fin,
            nbr_jour: demande.nbr_jour,
            allDay: true,
            color: t.length > 0 ? t[0].color : "green",
          });
        }
      });
      console.log(list);
      setCurrentEvents(list);
      setListDemande(list);
    }
  }, [demandes]);

  const conges = [
    {
      value: "30 fixed days per year ",
      label: "Paid",
      color: "purple",
    },

    userInfo.gender == "Female"
      ? {
          value: "60 jour fixe par an",
          label: "Maternity",
          color: "#e44662",
        }
      : {
          value: "3 jours fixes",
          label: "Paternity",
          color: "blue",
        },

    {
      value: "15 jours fixes",
      label: "RTT",
      color: "red",
    },
  ];

  const handleClose = () => setOpen(false);
  const handleEventClick = (selected) => {
    // if (
    //   window.confirm(
    //     `Are you sure you want to delete the event '${selected.event.title}'`
    //   )
    // ) {
    //   selected.event.remove();
    // }
  };

  const handleDateClick = (selecte) => {
    setOpen(true);
    setSelected(selecte);
  };

  const onSubmitHandler = () => {
    const date1 = new Date(selected.startStr);
    const date2 = new Date(selected.endStr);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    dispatch(
      userAddDemande({
        nbr_jour: diffDays,
        date_debut: date1,
        date_fin: date2,
        type: conge,
      })
    );
  };

  useEffect(() => {
    if (errorAdd) {
      toastAlert("your request exceeds the limit ", "error");
    }
  }, [errorAdd]);
  useEffect(() => {
    if (successADD) {
      setOpen(false);
      toastAlert("Your leave request have been saved");
      // const t = conges.filter((e) => (e.label === conge ? e.color : ""));
      // const calendarApi = selected.view.calendar;
      // calendarApi.unselect();
      // calendarApi.addEvent({
      //   id: `${selected.dateStr}-${conge}`,
      //   title: conge,
      //   conge,
      //   start: selected.startStr,
      //   end: selected.endStr,
      //   allDay: selected.allDay,
      //   color: t[0].color,
      // });
    }
  }, [successADD]);

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
          style={{
            maxHeight: "75vh",
            overflowY: "scroll",
          }}
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {listDemandes.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: getColor(event),
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <>
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                      <Typography>
                        {formatDate(event.end, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                      <Typography> Day number : {event.nbr_jour}</Typography>
                      <Typography
                        style={{ marginTop: "10px", textAlign: "right" }}
                      >
                        <Button
                          variant="contained"
                          color={
                            event.status == "accepted"
                              ? "success"
                              : event.status == "refused"
                              ? "error"
                              : "warning"
                          }
                        >
                          {event.status}
                        </Button>
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            dateClick={() => setOpen(false)}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            events={listDemandes}
          />
          {/* lehne */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} component="form">
              <TextField
                sx={{ width: "100%" }}
                id="outlined-select-currency"
                select
                // label="Select=="
                value={conge}
                onChange={(e) => setConge(e.target.value)}
                helperText="choose leave type"
                required
              >
                {conges.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              {loadingAdd ? (
                "loading"
              ) : (
                <Button
                  sx={{ mt: 2, width: "25ch" }}
                  variant="contained"
                  color="primary"
                  onClick={() => onSubmitHandler()}
                >
                  Add leave
                </Button>
              )}
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
