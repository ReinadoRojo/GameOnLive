"use client";
import { User } from "@prisma/client";

import { useSidebar } from "@/store/user-sidebar";
import { UserItem, UserItemSkeleton } from "./user-item";

interface RecomendedProps {
  data: User[];
}

export const Recomended = ({ data }: RecomendedProps) => {
  const { collapsed } = useSidebar(state => state);

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className='pl-6 mb-4'>
          <p className='text-sm text-muted-foreground'>Recommended</p>
        </div>
      )}
      <ul className='space-y-2 px-2'>
        {data.map(user => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={false}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecomendedSkeleton = () => {
  return (
    <ul className='px-2'>
      {[...Array(3)].map((_, index) => (
        <UserItemSkeleton key={index} />
      ))}
    </ul>
  );
};
