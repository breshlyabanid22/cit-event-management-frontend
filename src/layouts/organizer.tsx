import AppNavBar from "@/components/app/navbar";
import AppSidebar from "@/components/app/organizer/sidebar";
import { Outlet } from "react-router-dom";

export default function OrganizerLayout() {
	return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
    <div className="flex-1 relative flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
      <AppNavBar />
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <Outlet></Outlet>
        </div>
      </main>
      </div>
    </div>
	);
}

