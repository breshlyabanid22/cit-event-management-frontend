import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const ProtectedRoute = lazy(() => import("@/provider/ProtectedRoute"));
const Loader = lazy(() => import("@/components/loading"));
const ErrorPage = lazy(() => import("@/pages/error"));
const DefaultLayout = lazy(() => import("./layouts"));
const IndexPage = lazy(() => import("@/pages/index"));
const AboutPage = lazy(() => import("@/pages/about"));
const Login = lazy(() => import("@/pages/login"));
const OrganizerLayout = lazy(() => import("@/layouts/organizer"));
const OrganizerHome = lazy(() => import("@/pages/app/organizer/home"));
const Settings = lazy(() => import("@/pages/app/settings"));
const EventRegistration = lazy(
    () => import("@/pages/app/organizer/eventRegistration"),
);
const VenueManagement = lazy(() => import("@/pages/app/organizer/venue"));

const AdminLayout = lazy(() => import("@/layouts/admin"));
const AdminHome = lazy(() => import("@/pages/app/admin/home"));
const AdminUserManagement = lazy(
    () => import("@/pages/app/admin/user-management"),
);
const AdminVenueManagement = lazy(
    () => import("@/pages/app/admin/venue-management"),
);
const AdminResourceManagement = lazy(
    () => import("@/pages/app/admin/resource-management"),
);

const ParticipantLayout = lazy(() => import("@/layouts/participant"));
const ParticipantHome = lazy(() => import("@/pages/app/participant/home"));
const ParticipantScheduled = lazy(
    () => import("@/pages/app/participant/scheduled-list"),
);
const ParticipantUpcoming = lazy(
    () => import("@/pages/app/participant/upcoming-events"),
);
const ParticipantFeedback = lazy(
    () => import("@/pages/app/participant/feedback"),
);
function App() {
    return (
        <QueryClientProvider client={queryClient}>
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
                        <ProtectedRoute isAllowed="ORGANIZER">
                            <Suspense fallback={<Loader />}>
                                <OrganizerLayout />
                            </Suspense>
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={
                            <Suspense fallback={<Loader />}>
                                <OrganizerHome />
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
                        <ProtectedRoute isAllowed="ADMIN">
                            <Suspense fallback={<Loader />}>
                                <AdminLayout />
                            </Suspense>
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={
                            <Suspense fallback={<Loader />}>
                                <AdminHome />
                            </Suspense>
                        }
                    />
                    <Route path="user-management">
                        <Route
                            index
                            element={
                                <Suspense fallback={<Loader />}>
                                    <AdminUserManagement />
                                </Suspense>
                            }
                        />
                    </Route>
                    <Route path="resource-management">
                        <Route
                            index
                            element={
                                <Suspense fallback={<Loader />}>
                                    <AdminResourceManagement />
                                </Suspense>
                            }
                        />
                    </Route>
                    <Route path="venue-management">
                        <Route
                            index
                            element={
                                <Suspense fallback={<Loader />}>
                                    <AdminVenueManagement />
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

                {/* Participant routes */}
                <Route
                    path="participant"
                    element={
                        <ProtectedRoute isAllowed="PARTICIPANT">
                            <Suspense fallback={<Loader />}>
                                <ParticipantLayout />
                            </Suspense>
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={
                            <Suspense fallback={<Loader />}>
                                <ParticipantHome />
                            </Suspense>
                        }
                    />
                    <Route path="scheduled-list">
                        <Route
                            index
                            element={
                                <Suspense fallback={<Loader />}>
                                    <ParticipantScheduled />
                                </Suspense>
                            }
                        />
                    </Route>
                    <Route path="upcoming-event">
                        <Route
                            index
                            element={
                                <Suspense fallback={<Loader />}>
                                    <ParticipantUpcoming />
                                </Suspense>
                            }
                        />
                    </Route>
                    <Route path="feedback">
                        <Route
                            index
                            element={
                                <Suspense fallback={<Loader />}>
                                    <ParticipantFeedback />
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
        </QueryClientProvider>
    );
}

export default App;
