import { toast as notify } from "react-toastify";
export const toast = notify;
export const showToast = (message) => {
    toast(message);
};
