import { toast as notify } from "react-toastify";
export const toast = notify;

export function showToast(message: string, type: "success" | "error" = "success") {
  toast(message, { type });
}
