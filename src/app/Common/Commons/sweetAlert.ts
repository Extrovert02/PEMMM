import Swal from "sweetalert2";
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class sweetAlertCls {
    SwalAlertMessage(successOrFail: boolean, _icon: any, _message: string, showConfirmButton: boolean, showcancelButton: boolean) {

    Swal.fire({
      position: 'center',
      icon: _icon,
      title: _message,
      showConfirmButton: showConfirmButton,
      showCancelButton: showcancelButton ? true : false,
      // confirmButtonText: "Delete It",
      // confirmButtonColor: "#ff0055",
      // cancelButtonColor: "#999999",
      // reverseButtons: true,
      // focusConfirm: false,
      // focusCancel: true
    });
  }
}