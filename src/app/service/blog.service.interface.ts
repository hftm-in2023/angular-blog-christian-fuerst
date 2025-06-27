

/**
 * Definiert die exakte Struktur für einen einzelnen Blog-Eintrag,
 * basierend auf der API-Antwort.
 */
export interface Blog {
  id: number;
  updatedAt: string; // ISO-Datums-Strings werden als string behandelt
  createdAt: string;
  title: string;
  contentPreview: string; // Wichtig: Es ist 'contentPreview', nicht 'content'
  author: string;
  likes: number;
  comments: number;
  likedByMe: boolean;
  createdByMe: boolean;
  headerImageUrl: string;
}

/**
 * Definiert die exakte Struktur der gesamten API-Antwort.
 */
export interface ApiResponse {
  data: Blog[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  maxPageSize: number;
}