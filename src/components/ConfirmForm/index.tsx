import Swal from 'sweetalert2';
const ConfirmForm = async () => {
    const result = await Swal.fire({
        title: 'Bạn chắc chắn chứ?',
        icon: 'question',
        backdrop:true,
        toast: true,
    allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Hủy',
   

      });
      return result.isConfirmed;
};

export default ConfirmForm;
