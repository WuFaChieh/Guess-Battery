import { Device } from '@capacitor/device';

export interface DeviceBatteryInfo {
  supported: boolean;
  level: number; // 0 to 100
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}

// Random fallback for when no real battery reading is available at all
// (desktop browsers, or an iOS Safari tab — see below). Kept as its own
// helper since two different branches below need to return it.
function randomFallback(): DeviceBatteryInfo {
  return {
    supported: false,
    level: Math.floor(Math.random() * 60) + 20, // 20-80%
    charging: false,
    chargingTime: 0,
    dischargingTime: 0
  };
}

/**
 * Reads the device's real battery level.
 *
 * iOS Safari/WebKit has never implemented the web Battery Status API (Apple
 * has publicly declined to, citing fingerprinting risk) — so on iOS, the
 * plain web version of this game can only ever show a fake random number
 * here, even though the UI presents it as "your real device battery".
 *
 * `@capacitor/device`'s `getBatteryInfo()` fixes this specifically for the
 * native iOS/Android app builds: it goes through Capacitor's native bridge
 * instead of the browser, so it returns the actual battery level even on
 * iOS where the web API doesn't exist. When this code runs as a plain web
 * page (no native shell), `@capacitor/device` transparently falls back to
 * wrapping the same web Battery Status API this used to call directly — so
 * behavior for the Vercel-hosted web version is unchanged.
 */
export async function getDeviceBattery(): Promise<DeviceBatteryInfo> {
  if (typeof window === 'undefined') {
    return randomFallback();
  }

  try {
    const info = await Device.getBatteryInfo();
    if (typeof info.batteryLevel === 'number') {
      return {
        supported: true,
        level: Math.round(info.batteryLevel * 100),
        charging: info.isCharging ?? false,
        chargingTime: 0,
        dischargingTime: 0
      };
    }
    // batteryLevel undefined means the underlying platform (e.g. iOS Safari
    // in a plain browser tab, not the native app) has no reading to give —
    // fall through to the random fallback below.
  } catch (e) {
    console.debug('[deviceBattery] Capacitor Device API unavailable:', e);
  }

  return randomFallback();
}
