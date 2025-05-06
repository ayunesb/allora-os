import React from "react";

export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

export interface CardProps extends BaseProps {
  title: string;
  subtitle?: string;
}

export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ToastProps extends BaseProps {
  message: string;
  type?: "success" | "error" | "info";
}
