export interface EventStat {
  id: string;
  count: string;
  label: string;
  cameras: string[];
}

export const mockTodaysEvents: EventStat[] = [
  { id: "motion", count: "140", label: "Motion Detections", cameras: ["Camera 1", "Camera 2", "Camera 3", "Camera 4"] },
  { id: "fire", count: "02", label: "Incident of Fire", cameras: ["Camera 1", "Camera 2", "Camera 3", "Camera 4"] },
  { id: "accidents", count: "00", label: "Accidents", cameras: ["Camera 1", "Camera 2", "Camera 3", "Camera 4"] },
  { id: "gun", count: "01", label: "Incident of Gun Firing", cameras: ["Camera 1", "Camera 2", "Camera 3", "Camera 4"] },
];

export interface AlertUpdate {
  id: string;
  message: string;
  timestamp: string;
}

export const mockAlertUpdates: AlertUpdate[] = [
  {
    id: "alert-1",
    message: "North Fence Camera sent a notification to the Chief security officer about accident",
    timestamp: "12:03 PM | 12th Jun 2024",
  },
  {
    id: "alert-2",
    message: "North Fence Camera sent a notification to the Chief security officer about accident",
    timestamp: "12:03 PM | 12th Jun 2024",
  },
];

export interface CriticalEvent {
  id: string;
  message: string;
  timestamp: string;
}

export const mockCriticalEvents: CriticalEvent[] = [
  {
    id: "critical-1",
    message: "Gun Firing Detected in Area 1 - Camera 2",
    timestamp: "12:03 PM | 12th Jun 2024",
  },
];
