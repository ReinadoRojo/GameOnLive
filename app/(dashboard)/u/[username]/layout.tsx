import { redirect } from "next/navigation";

import { getSelfByUsername } from "@/lib/auth-service";

import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface CreatorLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
  const self = await getSelfByUsername(params.username).catch(err => {
    err.message === "Unauthorized"
      ? redirect(`/${params.username}`)
      : redirect("/");
  });

  if (!self?.stream) throw new Error("No stream found");

  return (
    <>
      <Navbar />
      <div className='flex h-full pt-20'>
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorLayout;
