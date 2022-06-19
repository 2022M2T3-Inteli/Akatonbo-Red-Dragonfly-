// Inicializar toasts do bootstrap
const toastElList = document.querySelectorAll('.toast');
const toastList = [...toastElList].map(
  (toastEl) => new bootstrap.Toast(toastEl)
);
toastList.forEach((toast) => toast.show());
