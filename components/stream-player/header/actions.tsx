"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { onFollow, onUnfollow } from "@/actions/follow";
import { cn } from "@/lib/utils";

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}

export const Actions = ({
  hostIdentity,
  isFollowing,
  isHost,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { userId } = useAuth();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then(({ following: { username } }) =>
          toast.success(`Now following ${username}`)
        )
        .catch(() => toast.error("Something went wrong!"));
    });
  };
  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then(({ following: { username } }) =>
          toast.success(`Have you unfollowed ${username}`)
        )
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  const toggleFollow = () => {
    if (!userId) return router.push("/login");

    if (isHost) return;

    if (isFollowing) handleUnfollow();
    else handleFollow();
  };

  return (
    <Button
      onClick={toggleFollow}
      variant={"primary"}
      size={"sm"}
      className='w-full lg:w-auto'
      disabled={isHost || isPending}
    >
      <HeartIcon
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className='h-10 w-full lg:w-24' />;
};
