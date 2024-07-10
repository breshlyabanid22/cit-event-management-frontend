import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import IndexPage from "@/pages/index";
import DefaultLayout from "./layouts";
import Loader from "./components/loading";
import UserLayout from "./layouts/user";
import ErrorPage from "./pages/error";
const AboutPage = lazy(() => import("@/pages/about"));
const Login = lazy(() => import("@/pages/login"));
const Home = lazy(() => import("@/pages/app/home"));
const Settings = lazy(() => import("@/pages/app/settings"));

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

			{/* User Layout */}
			<Route
				element={
					<Suspense fallback={<Loader></Loader>}>
						<UserLayout />
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
