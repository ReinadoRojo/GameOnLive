import { getRecommended } from "@/lib/recomended-service";
import { Recomended, RecomendedSkeleton } from "./recomended";
import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";

export const Sidebar = async () => {
  const recomended = await getRecommended();

  return (
    <Wrapper>
      <Toggle />
      <div className='space-y-4 pt-4 lg:pt-0'>
        <Recomended data={recomended} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className='fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50'>
      <RecomendedSkeleton />
    </aside>
  );
};
