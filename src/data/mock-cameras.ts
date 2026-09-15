import type { CameraStatusValue } from "@/tokens/colors";

export interface CameraSummary {
  id: string;
  name: string;
  imageSrc: string | null;
  status: CameraStatusValue;
  viewerCount?: number;
}

export const mockCameraStatusOverview = {
  activeCount: 13,
  disabledCount: 2,
  needsActionCount: 1,
  needsActionLocation: "Office Front",
};

/**
 * `imageSrc: null` renders as a placeholder fill — real camera thumbnails/
 * streams are out of scope for this pilot (see task constraints: no
 * live-camera integrations).
 */
export const mockRecentCameras: CameraSummary[] = [
  { id: "cam-1", name: "Camera 1 - North Fence 8", imageSrc: null, status: "online", viewerCount: 3 },
  { id: "cam-2", name: "Camera 2", imageSrc: null, status: "online", viewerCount: 1 },
  { id: "cam-3", name: "Camera 3", imageSrc: null, status: "standby", viewerCount: 0 },
];
