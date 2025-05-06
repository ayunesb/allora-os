import React, { ReactNode } from "react";
import { SocialMediaPost } from "@/types/unified-types";
interface SocialMediaContextProps {
  posts: SocialMediaPost[];
  loading: boolean;
  error: string | null;
  view: "list" | "calendar";
  currentMonth: Date;
  createPost: (post: any) => Promise<void>;
  updatePost: (id: string, updates: any) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  schedule: (id: string) => Promise<void>;
  approve: (id: string) => Promise<void>;
  setView: (view: "list" | "calendar") => void;
  setCurrentMonth: (date: Date) => void;
  refreshPosts: () => Promise<void>;
  isCreateDialogOpen: boolean;
  openCreateDialog: () => void;
  closeCreateDialog: () => void;
}
export declare const SocialMediaProvider: React.FC<{
  children: ReactNode;
}>;
export declare const useSocialMedia: () => SocialMediaContextProps;
export {};
