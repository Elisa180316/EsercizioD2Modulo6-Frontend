import hotToast from 'react-hot-toast';


export class Toast {
  constructor(message) {
    this.message = message;
  }

  success() {
    return hotToast.success(this.message);
  }

  warning() {
    return hotToast.error(this.message);
  }
}
