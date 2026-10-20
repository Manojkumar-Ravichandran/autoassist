import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.autoassist.vehicles",
  appName: "AutoAssist",
  webDir: "www",
  server: {
    // Set CAPACITOR_SERVER_URL to the deployed HTTPS app URL before building a release.
    // The default works with the Android emulator and a local Next dev server.
    url: process.env.CAPACITOR_SERVER_URL || "https://autoassist-71wvfm789-manojkumarwork1.vercel.app/mobile",
    cleartext: process.env.NODE_ENV !== "production",
    androidScheme: "https",
  },
};

export default config;
