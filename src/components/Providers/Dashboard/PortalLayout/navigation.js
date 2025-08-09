// src/components/Providers/Dashboard/PortalLayout/navigation.js
import { 
  LayoutDashboard, 
  FileText, 
  User, 
  Building2,
  CreditCard,
  Shield
} from 'lucide-react';

export const navigation = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/providers/portal",
    mobileLabel: "Home"
  },
  {
    id: "documents",
    label: "Documents",
    icon: FileText,
    href: "/providers/portal/documents",
    mobileLabel: "Docs"
  },
  {
    id: "centers",
    label: "Centers",
    icon: Building2,
    href: "/providers/portal/centers",
    mobileLabel: "Centers"
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    href: "/providers/portal/profile",
    mobileLabel: "Profile"
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
    href: "/providers/portal/billing",
    soon: true,
    mobileLabel: "Billing"
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    href: "/providers/portal/security",
    mobileLabel: "Security"
  },
];