import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const toastAlert = (text, icon = "success") => {
  Toast.fire({
    icon: icon,
    title: text,
  });
};

export const sweetAlert = ({ type, message, text }) => {
  Swal.fire({
    icon: type,
    title: message,
    text,
  });
};

export const sweetBox = ({ icon, type, name, title }) => {
  return Swal.fire({
    title,
    icon,
    showCancelButton: true,
    confirmButtonText: name,
  });
};
