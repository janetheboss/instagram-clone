import type { User } from "./User";

export interface Post{
  id: string;
  author: User;
  imageUrl: string;
  caption: string;
  likeCounter: number;
  likedByMe: boolean;
  comments: Comment[];
  createdAt: string;
}

export interface Comment{
  id: string;
  author: User;
  text: string;
  createdAt: string;
}