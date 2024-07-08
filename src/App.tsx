import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import IndexPage from "@/pages/index";
import DefaultLayout from "./layouts";
import Loader from "./components/loading";
import UserLayout from "./layouts/user";
const AboutPage = lazy(() => import("@/pages/about"));
const Login = lazy(() => import("@/pages/login"));
const Home = lazy(() => import("@/pages/app/home"));

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
			</Route>

		</Routes>
	);
}

export default App;
