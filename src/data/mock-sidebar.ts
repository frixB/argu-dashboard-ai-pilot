export interface SidebarNavItem {
  id: string;
  /** Semantic icon name — mapped to an actual icon asset once exported from Figma. */
  icon: string;
  label: string;
  href: string;
}

export const mockSidebarNavItems: SidebarNavItem[] = [
  { id: "grid", icon: "element-3", label: "Overview", href: "#" },
  { id: "map", icon: "map", label: "Map", href: "#" },
  { id: "cameras", icon: "camera", label: "Cameras", href: "#" },
  { id: "search", icon: "search-normal", label: "Search", href: "#" },
  { id: "notifications", icon: "notification", label: "Notifications", href: "#" },
  { id: "events", icon: "event", label: "Events", href: "#" },
  { id: "detect", icon: "detect", label: "Detections", href: "#" },
  { id: "documents", icon: "document", label: "Documents", href: "#" },
  { id: "settings", icon: "setting-2", label: "Settings", href: "#" },
];
