import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.agriconnect.app',
  appName: 'AgriConnect',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
