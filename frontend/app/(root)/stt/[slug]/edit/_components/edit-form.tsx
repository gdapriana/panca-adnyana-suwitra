"use client";

import InputCover from "@/app/(root)/stt/[slug]/edit/_components/input-cover";
import InputLogo from "@/app/(root)/stt/[slug]/edit/_components/input-logo";
import InputText from "@/app/(root)/stt/[slug]/edit/_components/input-text";
import InputTextArea from "@/app/(root)/stt/[slug]/edit/_components/input-textarea";
import { Button } from "@/components/ui/button";
import { fetchPatchSTT } from "@/lib/api/stt";
import { Role, Stt } from "@/lib/types";
import { Dispatch, SetStateAction, useState } from "react";

export default function SttEditForm({
  stt,
  slug,
  setLoading,
  token,
  role,
}: {
  stt: Stt | undefined;
  slug: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  token: string | undefined;
  role: Role | null;
}) {
  const [defaultName, setDefaultName] = useState<string | undefined>(stt?.name);
  const [defaultEmail, setDefaultEmail] = useState<string | undefined>(
    stt?.email,
  );
  const [defaultDescription, setDefaultDescription] = useState<
    string | undefined
  >(stt?.description);
  const [defaultIGUrl, setDefaultIGUrl] = useState<string | undefined>(
    stt?.instagram_url,
  );
  const [defaultWAUrl, setDefaultWAUrl] = useState<string | undefined>(
    stt?.whatsapp_url,
  );
  const [defaultFBUrl, setDefaultFBUrl] = useState<string | undefined>(
    stt?.facebook_url,
  );
  const [defaultLogoUrl, setDefaultLogoUrl] = useState<string | undefined>(
    stt?.logo_url,
  );
  const [defaultBackgroundUrl, setDefaultBackgroundUrl] = useState<
    string | undefined
  >(stt?.background_url);
  const [newBackgroundFile, setNewBackgroundFile] = useState<File>();
  const [newLogoFile, setNewLogoFile] = useState<File>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetchPatchSTT({
      setLoading,
      slug: slug,
      token: token!,
      sttProps: {
        background_public_id: stt?.background_public_id,
        logo_public_id: stt?.logo_public_id,
        background_url: defaultBackgroundUrl,
        logo_url: defaultLogoUrl,
        name: defaultName === stt?.name ? undefined : defaultName,
        description:
          defaultDescription === stt?.description
            ? undefined
            : defaultDescription,
        instagram_url:
          defaultIGUrl === stt?.instagram_url ? undefined : defaultIGUrl,
        facebook_url:
          defaultFBUrl === stt?.facebook_url ? undefined : defaultFBUrl,
        whatsapp_url:
          defaultWAUrl === stt?.whatsapp_url ? undefined : defaultWAUrl,
        email: defaultEmail === stt?.email ? undefined : defaultEmail,
        background_file: newBackgroundFile,
        logo_file: newLogoFile,
      },
      user_role: role,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 grid-cols-1 md:grid-cols-2 md:grid-rows-5"
    >
      <InputText
        name="name"
        placeholder="Masukkan nama"
        title="Nama STT"
        value={{ value: defaultName, setValue: setDefaultName }}
        disabled
      />
      <InputTextArea
        className="md:row-span-5"
        name="email"
        placeholder="Masukkan deskripsi STT"
        title="Deskripsi"
        value={{ value: defaultDescription, setValue: setDefaultDescription }}
      />
      <InputText
        name="instagram"
        placeholder="Masukkan tautan instagram"
        title="Tautan Instagram"
        value={{ value: defaultIGUrl, setValue: setDefaultIGUrl }}
      />
      <InputText
        name="facebook"
        placeholder="Masukkan tautan facebook"
        title="Tautan Facebook"
        value={{ value: defaultFBUrl, setValue: setDefaultFBUrl }}
      />
      <InputText
        name="whatsapp"
        placeholder="Masukkan tautan whatsapp"
        title="Tautan Whatsapp"
        value={{ value: defaultWAUrl, setValue: setDefaultWAUrl }}
      />
      <InputText
        name="email"
        type="email"
        placeholder="Masukkan email @info.com"
        title="Email"
        value={{ value: defaultEmail, setValue: setDefaultEmail }}
      />
      <InputLogo
        newImageFile={{
          file: newLogoFile,
          setFile: setNewLogoFile,
        }}
        defaultImage={{ url: defaultLogoUrl, setUrl: setDefaultLogoUrl }}
      />
      <InputCover
        newImageFile={{
          file: newBackgroundFile,
          setFile: setNewBackgroundFile,
        }}
        defaultImage={{
          url: defaultBackgroundUrl,
          setUrl: setDefaultBackgroundUrl,
        }}
      />
      <Button type="submit">Perbaharui</Button>
    </form>
  );
}
