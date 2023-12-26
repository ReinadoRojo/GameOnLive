"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { onBlock, onUnblock } from "@/actions/block";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then(data =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch((err: any) => toast.error(err.message));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then(data =>
          toast.success(
            `You are no longer following ${data.following.username}`
          )
        )
        .catch((err: any) => toast.error(err.message));
    });
  };

  const handleBlock = () => {
    startTransition(async () => {
      onBlock(userId)
        .then(data =>
          toast.success(`You have blocked ${data.blocked.username}`)
        )
        .catch((err: any) => toast.error(err.message));
    });
  };

  const handleUnblock = () => {
    startTransition(async () => {
      onUnblock(userId)
        .then(data =>
          toast.success(`You have unblocked ${data.blocked.username}`)
        )
        .catch((err: any) => toast.error(err.message));
    });
  };

  return (
    <>
      <Button
        disabled={isPending}
        onClick={isFollowing ? handleUnfollow : handleFollow}
        variant={"primary"}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button
        onClick={handleUnblock}
        disabled={isPending}
        variant={"outline"}
      >
        Block
      </Button>
    </>
  );
};
