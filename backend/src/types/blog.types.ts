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
