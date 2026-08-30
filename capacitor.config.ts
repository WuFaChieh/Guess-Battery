import type { CapacitorConfig } from '@capacitor/cli';

// ⚠️ appId is a PLACEHOLDER — pick your real reverse-DNS bundle identifier
// before you create the app record in App Store Connect (e.g. com.<yourname>.guessbattery,
// or based on a domain you own). It's essentially permanent once submitted.
const config: CapacitorConfig = {
  appId: 'com.guessbattery.app',
  appName: '猜電量 Guess the Battery',
  webDir: 'dist',
  ios: {
    // Match the app's dark UI (see index.css / Tailwind slate-950 background)
    // so the native status bar area doesn't flash white during launch.
    backgroundColor: '#020617',
    contentInset: 'automatic'
  }
};

export default config;
