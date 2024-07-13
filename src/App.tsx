import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const IndexPage = lazy(() => import("@/pages/index"));
const DefaultLayout = lazy(() => import("./layouts"));
const Loader = lazy(() => import("@/components/loading"));
const ErrorPage = lazy(() => import("@/pages/error"));
const AdminLayout = lazy(() => import("@/layouts/admin"));
const OrganizerLayout = lazy(() => import("@/layouts/organizer"));
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

      {/* Organizer routes */}
      <Route
        path="organizer"
        element={
          <Suspense fallback={<Loader />}>
            <OrganizerLayout />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />
        <Route path="event-registration">
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <EventRegistration />
              </Suspense>
            }
          />
        </Route>
        <Route path="venue-management">
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <VenueManagement />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="settings"
          element={
            <Suspense fallback={<Loader />}>
              <Settings />
            </Suspense>
          }
        />
      </Route>

      {/* Admin routes */}
      <Route
        path="admin"
        element={
          <Suspense fallback={<Loader />}>
            <AdminLayout />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />
        <Route path="event-registration">
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <EventRegistration />
              </Suspense>
            }
          />
        </Route>
        <Route path="venue-management">
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <VenueManagement />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="settings"
          element={
            <Suspense fallback={<Loader />}>
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
