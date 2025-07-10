export interface updateSTT {
  name?: string;
  slug?: string;
  leader_username?: string;
  vice_username?: string;
  treasurer_username?: string;
  secretary_username?: string;
  logo_url?: string;
  logo_public_id?: string;
  background_url?: string;
  background_public_id?: string;
  description?: string;
  email?: string;
  instagram_url?: string;
  whatsapp_url?: string;
  facebook_url?: string;
}

export interface CreateSTT {
  name: string;
  slug: string;
  leader_username?: string;
  vice_username?: string;
  treasurer_username?: string;
  secretary_username?: string;
  logo_url?: string;
  logo_public_id?: string;
  background_url?: string;
  background_public_id?: string;
  description?: string;
  email?: string;
  instagram_url?: string;
  whatsapp_url?: string;
  facebook_url?: string;
}
