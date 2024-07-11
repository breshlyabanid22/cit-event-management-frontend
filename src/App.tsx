import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import IndexPage from "@/pages/index";
import DefaultLayout from "./layouts";
import Loader from "./components/loading";
import ErrorPage from "./pages/error";
import StudentLayout from "./layouts/student";
import OrganizerLayout from "./layouts/organizer";
import AdminLayout from "./layouts/admin";
const AboutPage = lazy(() => import("@/pages/about"));
const Login = lazy(() => import("@/pages/login"));
const Home = lazy(() => import("@/pages/app/organizer/home"));
const Settings = lazy(() => import("@/pages/app/settings"));
const EventRegistration = lazy(
	() => import("@/pages/app/organizer/eventRegistration"),
);
const VenueManagement = lazy(() => import("@/pages/app/organizer/venue"));
function App() {
	return (
		<Routes>
			{/* Landing Page */}
			<Route
				element={
					<Suspense fallback={<Loader></Loader>}>
						<DefaultLayout />
					</Suspense>
				}
			>
				<Route
					path="/"
					element={
						<Suspense fallback={<Loader></Loader>}>
							<IndexPage />
						</Suspense>
					}
				/>
				<Route
					path="/about"
					element={
						<Suspense fallback={<Loader></Loader>}>
							<AboutPage />
						</Suspense>
					}
				/>
			</Route>
			{/* Login Page */}
			<Route
				path="/login"
				element={
					<Suspense fallback={<Loader></Loader>}>
						<Login />
					</Suspense>
				}
			/>

			{/* Organizer Layout */}
			<Route
				element={
					<Suspense fallback={<Loader></Loader>}>
						<OrganizerLayout />
					</Suspense>
				}
			>
				<Route
					path="/app"
					element={
						<Suspense fallback={<Loader></Loader>}>
							<Home />
						</Suspense>
					}
				/>
				<Route
					path="/settings"
					element={
						<Suspense fallback={<Loader></Loader>}>
							<Settings />
						</Suspense>
					}
				/>
				<Route
					path="/event-registration"
					element={
						<Suspense fallback={<Loader></Loader>}>
							<EventRegistration />
						</Suspense>
					}
				/>
				<Route
					path="/venue-management"
					element={
						<Suspense fallback={<Loader></Loader>}>
							<VenueManagement />
						</Suspense>
					}
				/>
			</Route>

			{/* Student Layout */}
			<Route
				element={
					<Suspense fallback={<Loader></Loader>}>
						<StudentLayout />
					</Suspense>
				}
			>
				<Route
					path="/app"
					element={
						<Suspense fallback={<Loader></Loader>}>
							<Home />
						</Suspense>
					}
				/>
				<Route
					path="/settings"
					element={
						<Suspense fallback={<Loader></Loader>}>
							<Settings />
						</Suspense>
					}
				/>
			</Route>

			{/* Admin Layout */}
			<Route
				element={
					<Suspense fallback={<Loader></Loader>}>
						<AdminLayout />
					</Suspense>
				}
			>
				<Route
					path="/app"
					element={
						<Suspense fallback={<Loader></Loader>}>
							<Home />
						</Suspense>
					}
				/>
				<Route
					path="/settings"
					element={
						<Suspense fallback={<Loader></Loader>}>
							<Settings />
						</Suspense>
					}
				/>
			</Route>

			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
}

export default App;
