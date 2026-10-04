import { BookOpen, Brain, GraduationCap } from "lucide-react";

export const quickActions = [
    {
        title: "Choose Class",
        description: "Select your current school grade.",
        href: "/dashboard/classes",
        icon: GraduationCap,
    },
    {
        title: "Browse Subjects",
        description: "Explore all available mathematics topics.",
        href: "/dashboard/subjects",
        icon: BookOpen,
    },
    {
        title: "Start AI Practice",
        description: "Practice with unlimited AI-generated questions.",
        href: "/dashboard/practice",
        icon: Brain,
    },
];
