import { getAllResources } from "@/lib/resourcesStore";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const resources = await getAllResources();
  return <HomeClient resources={resources} />;
}