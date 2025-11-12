/**
 * Dynamic Lucide icon renderer helper (ASCII-only).
 */

import * as LucideIcons from "lucide-react";
import { ICON_MAP } from "./icon-map";


export function renderIcon(
  key: keyof typeof ICON_MAP,
  size: number = 24,
  className: string = "text-gray-700"
) {
  const iconName = ICON_MAP[key];
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons];
  if (!IconComponent) {
    console.warn("Missing icon for key:", key);
    return null;
  }
  return <IconComponent size={size} className={className} />;
}

console.log("Icon Renderer Helper loaded");
