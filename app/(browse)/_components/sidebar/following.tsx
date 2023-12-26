"use client";
import { Follow, User } from "@prisma/client";

import { useSidebar } from "@/store/use-sidebar";
import { UserItem, UserItemSkeleton } from "./user-item";

interface FollowingProps {
  data: (Follow & {
    following: User & { stream: { isLive: boolean } | null };
  })[];
}

export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar(state => state);

  if (!data.length) return null;

  return (
    <div>
      {!collapsed && (
        <div className='pl-6 mb-4'>
          <p className='text-sm text-muted-foreground'>Following</p>
        </div>
      )}
      <ul className='space-y-2 px-2'>
        {data.map(streamer => (
          <UserItem
            key={streamer.following.id}
            username={streamer.following.username}
            imageUrl={streamer.following.imageUrl}
            isLive={streamer.following.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className='px-2 pt-2 lg_pt-0'>
      {[...Array(3)].map((_, index) => (
        <UserItemSkeleton key={index} />
      ))}
    </ul>
  );
};
