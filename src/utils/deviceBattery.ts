export interface DeviceBatteryInfo {
  supported: boolean;
  level: number; // 0 to 100
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}

export async function getDeviceBattery(): Promise<DeviceBatteryInfo> {
  if (typeof window === 'undefined' || !('getBattery' in navigator)) {
    return {
      supported: false,
      level: Math.floor(Math.random() * 60) + 20, // Fallback fallback random 20-80%
      charging: false,
      chargingTime: 0,
      dischargingTime: 0
    };
  }

  try {
    const battery = await (navigator as unknown as { getBattery: () => Promise<{
      level: number;
      charging: boolean;
      chargingTime: number;
      dischargingTime: number;
    }> }).getBattery();

    return {
      supported: true,
      level: Math.round(battery.level * 100),
      charging: battery.charging,
      chargingTime: battery.chargingTime,
      dischargingTime: battery.dischargingTime
    };
  } catch {
    return {
      supported: false,
      level: 75,
      charging: true,
      chargingTime: 0,
      dischargingTime: 0
    };
  }
}
