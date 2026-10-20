AutoAssist contains an administrator web console and an installable mobile vehicle guide. The web console and mobile client share the same MongoDB vehicle records. Mobile devices keep a local copy of active records and can search and read them offline after the first successful sync.

## Run locally

1. Install Node.js 20+ and MongoDB, then run `npm install`.
2. Copy `.env.local.example` to `.env.local` and set the values below.
3. Start MongoDB and run `npm run dev`.
4. Open `http://localhost:3000/login` for the admin and `http://localhost:3000/mobile` for the mobile guide.

Required environment values:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/autoassist
ADMIN_USERNAME=admin
ADMIN_PASSWORD=replace-with-a-long-unique-password
ADMIN_SESSION_SECRET=replace-with-a-random-secret-at-least-32-characters
```

Set a unique administrator password and session secret before deployment. Without administrator credentials configured, sign-in is intentionally unavailable. Deploy the Next.js server and MongoDB on an HTTPS host reachable by the phones; configure `MONGODB_URI` to that same database. Admin-created or updated vehicle masters then appear in the mobile sync endpoint. Mobile sync downloads active vehicle records; offline access works for records downloaded previously on that device. Reconnect to refresh after admin changes.

## Install on Android

The mobile route is a Progressive Web App. Serve it from HTTPS, open `/mobile` in Android Chrome, choose **Install app** (or **Add to Home screen**), and launch AutoAssist from the home screen. The first launch needs a connection to sync records; later launches can use the saved catalog offline. Browser storage can be cleared by Android, so reconnect periodically to refresh the local copy.

The mobile guide is also available as an installable PWA at `/mobile`. After building and publishing a signed APK, the website download page at `/download` automatically exposes the Android download link.

### Build a native Android app with Capacitor

Capacitor packages the mobile guide locally, so the app interface starts without loading a web page from Vercel. The Android Studio project is in `android/`. Set `VITE_AUTOASSIST_API_BASE` to the stable HTTPS domain of the deployed app (no path), then run `npm run android:sync` and `npm run android:open`. In Android Studio choose **Build > Generate Signed Bundle / APK > APK** and use the same signing key for updates. Copy the signed APK to `public/downloads/AutoAssist.apk` and redeploy the website; `/download` provides the download button. The app contacts that domain only to sync vehicle records, and previously synced records remain on the device for offline lookup.

## Build

Run `npm run build` for a production build and `npm run start` to serve it. The app requires MongoDB connectivity for admin data and mobile sync.
