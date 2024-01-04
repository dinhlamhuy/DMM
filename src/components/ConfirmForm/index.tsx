/* eslint-disable @typescript-eslint/no-explicit-any */
// import avata from '../../../public/img/avatar.gif'
import Swal from "sweetalert2";
const ConfirmForm = async (iconType: any, alertTitle: any) => {
  const result = await Swal.fire({
    title: alertTitle,
    icon: iconType,
    // backdrop: true,
    color: "#716add",
    background:'#fff',
    backdrop: `
    rgba(0,0,40,0.4)
    url("../../../public/img/avatar.gif")
    center top
    no-repeat
  `,
    toast: false,
    allowOutsideClick: false,
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Hủy",
  });
  return result.isConfirmed;
};

export default ConfirmForm;
