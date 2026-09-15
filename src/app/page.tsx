import { Button, IconButton } from "@/components/ui";
import {
  CameraCard,
  CameraStatus,
  ChartCard,
  EmptyCameraSlot,
  Header,
  Sidebar,
  StatCard,
} from "@/components/dashboard";
import { mockAlertUpdates, mockTodaysEvents } from "@/data/mock-events";
import { mockRecentCameras } from "@/data/mock-cameras";
import { mockSidebarNavItems } from "@/data/mock-sidebar";

/**
 * Component smoke test — NOT the Dashboard/Main screen.
 *
 * This page exists only to prove every token + component contract in
 * src/tokens and src/components compiles and renders together. Building the
 * actual Figma "Dashboard/Main" layout is a follow-up step.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col gap-8 bg-surface-page p-8">
      <Header title="Component Preview" location="Florida" date="18th May 2024" time="08:24am" />

      <div className="flex gap-8">
        <Sidebar
          items={mockSidebarNavItems.map((item) => ({
            id: item.id,
            href: item.href,
            label: item.label,
            icon: <span aria-hidden>•</span>,
          }))}
          activeItemId="grid"
        />

        <main className="flex flex-1 flex-col gap-8">
          <div className="flex flex-wrap gap-3">
            <Button>Add New Event</Button>
            <Button variant="outline">Share Dashboard</Button>
            <IconButton icon={<span aria-hidden>⚙</span>} aria-label="Settings" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <StatCard header={{ title: "Today's Events", actions: <span>143 events</span> }}>
              <ul className="flex flex-col gap-4">
                {mockTodaysEvents.map((event) => (
                  <li key={event.id} className="flex items-center gap-3">
                    <span className="font-medium">{event.count}</span>
                    <span>{event.label}</span>
                  </li>
                ))}
              </ul>
            </StatCard>

            <StatCard
              header={{
                icon: <span aria-hidden>🔔</span>,
                title: "Alerts Updates",
                actions: <a href="#">View All</a>,
              }}
            >
              <ul className="flex flex-col gap-4">
                {mockAlertUpdates.map((alert) => (
                  <li key={alert.id}>
                    <p>{alert.message}</p>
                    <p className="text-xs text-text-secondary/60">{alert.timestamp}</p>
                  </li>
                ))}
              </ul>
            </StatCard>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {mockRecentCameras.map((camera) => (
              <CameraCard
                key={camera.id}
                name={camera.name}
                imageSrc={camera.imageSrc}
                status={camera.status}
                viewerCount={camera.viewerCount}
              />
            ))}
            <EmptyCameraSlot />
          </div>

          <div className="flex items-center gap-4">
            <CameraStatus status="online" />
            <CameraStatus status="offline" />
            <CameraStatus status="standby" />
          </div>

          <ChartCard title="Frequent Events" actions={<span>This Month</span>}>
            <p className="text-sm text-text-secondary/60">Chart placeholder — library not yet chosen.</p>
          </ChartCard>
        </main>
      </div>
    </div>
  );
}
