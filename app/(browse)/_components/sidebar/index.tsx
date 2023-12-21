import { getRecommended } from "@/lib/recomended-service";
import { Recomended } from "./recomended";
import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";

export const Sidebar = async () => {
  const recomended = await getRecommended();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Recomended data={recomended} />
      </div>
    </Wrapper>
  );
};
