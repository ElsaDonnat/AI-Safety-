import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.elsadonnat.aisafety',
  appName: 'AI Safety',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      backgroundColor: '#F0F4F8',
      style: 'LIGHT',
      overlaysWebView: false,
    },
    SplashScreen: {
      launchAutoHide: true,
      autoHideDelay: 1500,
      backgroundColor: '#F0F4F8',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_aisafety',
      iconColor: '#1E3A5F',
    },
  },
  android: {
    backgroundColor: '#F0F4F8',
    overScrollMode: 'never',
    allowMixedContent: false,
  },
};

export default config;
