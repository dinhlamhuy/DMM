/* eslint-disable @typescript-eslint/no-explicit-any */

import Swal from 'sweetalert2';

const AlertForm = async (iconType: any, alertTitle: any) => {
  try {
    const result = await Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    }).fire({
      icon: iconType,
      title: alertTitle
    });

    return result;
  } catch (error) {
    console.error("Error displaying alert:", error);
    throw error;
  }
};

export default AlertForm;
