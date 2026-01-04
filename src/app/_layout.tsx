import '@/global.css';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';

// 1. Token Cache (Keep this, it's correct)
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// 2. The "Bouncer" Component (New!)
function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return; // Wait for Clerk to load

    const inAuthGroup = segments[0] === '(auth)';

    if (isSignedIn && inAuthGroup) {
      // If user is signed in, send them to the Home page
      router.replace('/(protected)/(tabs)'); 
    } else if (!isSignedIn) {
      // If user is NOT signed in, send them to Sign In
      // NOTE: Make sure this file exists! (See Step 2 below)
      router.replace('/(auth)/sign-in');
    }
  }, [isSignedIn, isLoaded]);

  return <Slot />;
}

// 3. The Main Root Layout
export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error('Missing Publishable Key');
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <InitialLayout />
    </ClerkProvider>
  );
}