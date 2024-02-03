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
    rgba(0,0,20,0.4)
   
  `,
    toast: false,
    allowOutsideClick: false,
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
  });
  return result.isConfirmed;
};

export default ConfirmForm;
