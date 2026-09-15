export interface FrequentEventsPoint {
  month: string;
  motionDetections: number;
  accidents: number;
  gunFiring: number;
}

export const mockFrequentEvents: FrequentEventsPoint[] = [
  { month: "Jan", motionDetections: 4200, accidents: 900, gunFiring: 300 },
  { month: "Feb", motionDetections: 5100, accidents: 700, gunFiring: 250 },
  { month: "Mar", motionDetections: 6800, accidents: 1200, gunFiring: 400 },
  { month: "April", motionDetections: 8900, accidents: 1400, gunFiring: 500 },
  { month: "May", motionDetections: 10200, accidents: 1600, gunFiring: 600 },
  { month: "June", motionDetections: 12500, accidents: 1800, gunFiring: 700 },
];

export interface EventOccurrenceSlice {
  id: string;
  label: string;
  percentage: number;
}

export const mockEventOccurrence: EventOccurrenceSlice[] = [
  { id: "fire", label: "Fire", percentage: 22.2 },
  { id: "gun", label: "Gun Firing", percentage: 22.2 },
  { id: "motion", label: "People Motion", percentage: 22.2 },
  { id: "accidents", label: "Accidents", percentage: 33.3 },
];
