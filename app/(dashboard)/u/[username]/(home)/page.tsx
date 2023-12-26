import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { StreamPlayer } from "./_components/stream-player";

interface CreatorPageProps {
  params: { username: string };
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const user = await getSelfByUsername(params.username);

  if (!user) {
    redirect(`/${params.username}`);
  }

  return (
    <div className='h-full'>
      <StreamPlayer
        user={user}
        stream={user?.stream}
        isFollowing
      />
    </div>
  );
};

export default CreatorPage;
