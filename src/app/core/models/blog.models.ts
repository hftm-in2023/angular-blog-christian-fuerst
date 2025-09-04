// Basierend auf den Zod-Schemas aus dem ursprünglichen blog.service.ts

export interface Comment {
  id: number;
  content: string;
  author: string;
  updatedAt: string;
  createdAt: string;
}

export interface BlogEntryPreview {
  id: number;
  title: string;
  contentPreview: string;
  headerImageUrl?: string;
  author: string;
  createdAt: string;
  likes: number;
}

export interface BlogEntry {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  createdByMe: boolean;
  likedByMe: boolean;
  updatedAt: string;
}
