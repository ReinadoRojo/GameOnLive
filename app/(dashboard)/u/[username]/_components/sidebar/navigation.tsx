"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import {
  FullscreenIcon,
  KeyRoundIcon,
  MessageSquareIcon,
  UsersIcon,
} from "lucide-react";

import { NavItem, NavItemSkeleton } from "./nav-item";

export const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = [
    {
      label: "Stream",
      href: `/u/${user?.username}`,
      icon: FullscreenIcon,
    },
    {
      label: "Keys",
      href: `/u/${user?.username}/keys`,
      icon: KeyRoundIcon,
    },
    {
      label: "Chat",
      href: `/u/${user?.username}/chat`,
      icon: MessageSquareIcon,
    },
    {
      label: "Community",
      href: `/u/${user?.username}/community`,
      icon: UsersIcon,
    },
  ];

  if (!user?.username) {
    return (
      <ul className='space-y-2'>
        {[...Array(4)].map((_, index) => (
          <NavItemSkeleton key={index} />
        ))}
      </ul>
    );
  }

  return (
    <ul className='space-y-2 px-2 pt-4 lg:pt-0'>
      {routes.map((route, index) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};
