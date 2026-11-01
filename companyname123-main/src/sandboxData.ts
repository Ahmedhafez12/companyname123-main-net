// sandboxData.ts

export interface Channel {
  id: string;
  name: string;
  frequency: string;
  status: "active" | "standby" | "fault";
  load: number; // percentage
}

export const MOCK_CHANNELS: Channel[] = [
  {
    id: "ch-1",
    name: "Primary Uplink",
    frequency: "433.50 MHz",
    status: "active",
    load: 42,
  },
  {
    id: "ch-2",
    name: "Secondary Telemetry",
    frequency: "1.2 GHz",
    status: "active",
    load: 18,
  },
  {
    id: "ch-3",
    name: "Emergency Beacon",
    frequency: "121.5 MHz",
    status: "standby",
    load: 0,
  },
  {
    id: "ch-4",
    name: "Deep Space Feed",
    frequency: "8.4 GHz",
    status: "fault",
    load: 85,
  },
  {
    id: "ch-5",
    name: "Lunar Relay",
    frequency: "2.2 GHz",
    status: "standby",
    load: 5,
  },
];

export interface ComponentItem {
  id: string;
  title: string;
  render: (props: { direction: "ltr" | "rtl" }) => React.ReactNode;
}

export interface ComponentGroup {
  id: string;
  category: string;
  components: ComponentItem[];
}
