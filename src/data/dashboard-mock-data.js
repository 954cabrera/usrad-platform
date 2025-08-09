// src/data/dashboard-mock-data.js
import { 
  Building2, 
  FileText, 
  TrendingUp, 
  Activity,
  Users
} from 'lucide-react';

export const stats = [
  {
    id: 1,
    label: "Documents",
    value: 1,
    icon: FileText,
    color: "emerald",
    iconColor: '#10b981',
    bgColor: "rgba(34, 197, 94, 0.1)",
    borderColor: "rgba(34, 197, 94, 0.2)",
    status: "Active",
    trend: null,
    mobileLabel: "Docs"
  },
  {
    id: 2,
    label: "Active Centers",
    value: 1,
    icon: Building2,
    color: "blue",
    iconColor: '#3b82f6',
    bgColor: "rgba(59, 130, 246, 0.1)",
    borderColor: "rgba(59, 130, 246, 0.2)",
    status: "Verified",
    trend: null,
    mobileLabel: "Centers"
  },
  {
    id: 3,
    label: "Monthly Scans",
    value: "0",
    icon: Activity,
    color: "amber",
    iconColor: '#f59e0b',
    bgColor: "rgba(245, 158, 11, 0.1)",
    borderColor: "rgba(245, 158, 11, 0.2)",
    status: "Pending",
    subtext: "Awaiting first patients",
    trend: null,
    mobileLabel: "Scans"
  },
  {
    id: 4,
    label: "Compliance Score",
    value: "95%",
    icon: TrendingUp,
    color: "emerald",
    iconColor: '#10b981',
    bgColor: "rgba(34, 197, 94, 0.1)",
    borderColor: "rgba(34, 197, 94, 0.2)",
    status: "Excellent",
    trend: "+5%",
    mobileLabel: "Score"
  },
];

export const quickActions = [
  { 
    label: "Upload Document", 
    icon: FileText, 
    href: "/providers/portal/documents", 
    color: "blue", 
    bgColor: "rgba(59, 130, 246, 0.05)", 
    iconColor: "#3b82f6" 
  },
  { 
    label: "Add Center", 
    icon: Building2, 
    href: "/providers/portal/centers", 
    color: "purple", 
    bgColor: "rgba(147, 51, 234, 0.05)", 
    iconColor: "#9333ea" 
  },
  { 
    label: "View Reports", 
    icon: TrendingUp, 
    href: "/providers/portal/reports", 
    color: "emerald", 
    bgColor: "rgba(34, 197, 94, 0.05)", 
    iconColor: "#10b981" 
  },
  { 
    label: "Get Support", 
    icon: Users, 
    href: "/providers/support", 
    color: "amber", 
    bgColor: "rgba(245, 158, 11, 0.05)", 
    iconColor: "#f59e0b" 
  },
];

export const monthlyScans = [
  { month: "Jan", scans: 145 },
  { month: "Feb", scans: 189 },
  { month: "Mar", scans: 234 },
  { month: "Apr", scans: 281 },
  { month: "May", scans: 325 },
  { month: "Jun", scans: 0 },
];

export const scansByType = [
  { type: "MRI", count: 542, percentage: 45 },
  { type: "CT", count: 325, percentage: 27 },
  { type: "X-Ray", count: 216, percentage: 18 },
  { type: "Ultrasound", count: 120, percentage: 10 },
];