export interface CreateBlog {
  name: string;
  category_slug: string;
  cover_url?: string;
  description?: string;
  body?: string;
  stt_slug: string;
}

export interface UpdateBlog {
  name?: string;
  category_slug?: string;
  cover_url?: string;
  description?: string;
  body?: string;
}

export interface BlogQuery {
  order?: "latest" | "name";
  name?: string;
  take?: string;
}

export interface CommentBlog {
  message: string;
}
