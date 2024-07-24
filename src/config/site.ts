export type SiteConfig = typeof siteConfig;

export const AdminSideBarItems = [
    {
        label: "User Management",
        href: "/admin/user-management",
    },
    {
        label: "Resource Management",
        href: "/admin/resource-management",
    },
    {
        label: "Venue Management",
        href: "/admin/venue-management",
    },
    {
        label: "Event Management",
        href: "/admin/event-management",
    },
];

export const ParticipantSideBarItems = [
    {
        label: "Scheduled List",
        href: "/participant/scheduled-list",
    },
    {
        label: "Upcoming Events",
        href: "/participant/upcoming-event",
    },
];

export const OrganizerSideBarItems = [
    {
        label: "Events",
        href: "/organizer/events",
    },
    {
        label: "Event Registration",
        href: "/organizer/event-registration",
    },
];

export const VenueManagerSideBarItems = [
    {
        label: "Venue Management",
        href: "/venue-management",
    },
];

export const EventManagerSideBarItems = [
    {
        label: "Event Management",
        href: "/event-management",
    },
];

export const ResourceManagerSideBarItems = [
    {
        label: "Resource Management",
        href: "/resource-management",
    },
];

export const siteConfig = {
    name: "CIT Event Manager",
    description:
        "Make beautiful websites regardless of your design experience.",
    navItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "About",
            href: "/about",
        },
    ],
    navMenuItems: [
        {
            label: "Profile",
            href: "/profile",
        },
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Projects",
            href: "/projects",
        },
        {
            label: "Team",
            href: "/team",
        },
        {
            label: "Calendar",
            href: "/calendar",
        },
        {
            label: "Settings",
            href: "/settings",
        },
        {
            label: "Help & Feedback",
            href: "/help-feedback",
        },
        {
            label: "Logout",
            href: "/logout",
        },
    ],
    links: {
        github: "https://github.com/breshlyabanid22/cit-event-management-system",
    },
};
