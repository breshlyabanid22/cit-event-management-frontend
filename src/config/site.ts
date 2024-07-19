export type SiteConfig = typeof siteConfig;

export const AdminSideBarItems = [
    {
        label: "Home",
        href: "/admin",
    },
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
    {
        label: "Settings",
        href: "/admin/settings",
    },
];

export const ParticipantSideBarItems = [
    {
        label: "Home",
        href: "/participant",
    },
    {
        label: "Event Registration",
        href: "/participant/event-registration",
    },
    {
        label: "Scheduled List",
        href: "/participant/scheduled-list",
    },
    {
        label: "Upcoming Events",
        href: "/participant/upcoming-event",
    },
    {
        label: "Feedback",
        href: "/participant/feedback",
    },
    {
        label: "Settings",
        href: "/participant/settings",
    },
];

export const OrganizerSideBarItems = [
    {
        label: "Home",
        href: "/organizer",
    },
    {
        label: "Event Registration",
        href: "/organizer/event-registration",
    },
    {
        label: "Venue Management",
        href: "/organizer/venue-management",
    },
    {
        label: "Settings",
        href: "/organizer/settings",
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
