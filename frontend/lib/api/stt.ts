import { destroy, upload } from "@/lib/api/cloudinary";
import { Role, Stt } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const fetchSTT = async ({
  slug,
  setLoading,
  setStt,
}: {
  slug: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setStt: Dispatch<SetStateAction<Stt | undefined>>;
}) => {
  try {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/stt/${slug}`,
    );
    const data = await response.json();
    if (!response.ok) {
      toast.error(JSON.stringify(data.errors));
      return;
    }
    setStt(data.data);
  } catch (e) {
    toast(JSON.stringify(e));
  } finally {
    setLoading(false);
  }
};

export const fetchPatchSTT = async ({
  sttProps,
  token,
  setLoading,
  user_role,
  slug,
}: {
  sttProps: {
    name: string | undefined;
    email: string | undefined;
    description: string | undefined;
    instagram_url: string | undefined;
    facebook_url: string | undefined;
    whatsapp_url: string | undefined;
    logo_file: File | undefined;
    logo_public_id: string | undefined;
    background_file: File | undefined;
    background_public_id: string | undefined;
    background_url: string | undefined;
    logo_url: string | undefined;
  };
  token: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  user_role: Role | null;
  slug: string;
}) => {
  let cloudResponseLogo: { url: string; public_id: string } | undefined =
    undefined;
  let cloudResponseBackground: { url: string; public_id: string } | undefined =
    undefined;
  try {
    setLoading(true);
    if (sttProps.logo_file) {
      cloudResponseLogo = await upload({
        setLoading,
        selectedFile: sttProps.logo_file,
        token,
      });
    }
    if (sttProps.background_file) {
      cloudResponseBackground = await upload({
        setLoading,
        selectedFile: sttProps.background_file,
        token,
      });
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${user_role === "ADMIN" ? "stt" : "mainstt"}/${slug}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-API-TOKEN": token,
        },
        body: JSON.stringify({
          name: sttProps.name,
          logo_url: cloudResponseLogo?.url || sttProps.logo_url || undefined,
          background_url:
            cloudResponseBackground?.url ||
            sttProps.background_url ||
            undefined,
          logo_public_id: cloudResponseLogo?.public_id || undefined,
          background_public_id: cloudResponseLogo?.public_id || undefined,
          description: sttProps.description,
          email: sttProps.email,
          instagram_url: sttProps.instagram_url,
          whatsapp_url: sttProps.whatsapp_url,
          facebook_url: sttProps.facebook_url,
        }),
      },
    );
    const data = await res.json();
    if (!res.ok) {
      toast.error(JSON.stringify(data.errors));
      return;
    }
    if (cloudResponseLogo?.url) {
      await destroy({ token, public_id: sttProps.logo_public_id, setLoading });
    }
    if (cloudResponseBackground?.url) {
      await destroy({
        token,
        public_id: sttProps.background_public_id,
        setLoading,
      });
    }
    toast.success("stt berhasil di perbaharui!");
    window.location.reload();
    window.location.replace(`/stt/${slug}`);
  } catch (e) {
    cloudResponseLogo?.public_id &&
      (await destroy({
        token,
        public_id: cloudResponseLogo.public_id,
        setLoading,
      }));
    cloudResponseBackground?.public_id &&
      (await destroy({
        token,
        public_id: cloudResponseBackground.public_id,
        setLoading,
      }));
    toast(JSON.stringify(e));
  } finally {
    setLoading(false);
  }
};
