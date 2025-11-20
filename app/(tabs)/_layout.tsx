
import { BottomNavBar } from '@/components/ui/bottom-nav-bar';
import { Slot, useRouter, useSegments } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const NAV_KEYS = ['index', 'explore'] as const;
type NavKey = typeof NAV_KEYS[number];

function getCurrentTab(segments: string[] | undefined): NavKey {
  if (!segments || segments.length === 0) return 'index';
  // Typical: ['', '(tabs)', 'index'] or ['', '(tabs)', 'explore']
  if (segments.length >= 3 && NAV_KEYS.includes(segments[2] as NavKey)) {
    return segments[2] as NavKey;
  }
  // Sometimes: ['(tabs)', 'index']
  if (segments.length >= 2 && NAV_KEYS.includes(segments[1] as NavKey)) {
    return segments[1] as NavKey;
  }
  // Sometimes: ['index']
  if (NAV_KEYS.includes(segments[0] as NavKey)) {
    return segments[0] as NavKey;
  }
  return 'index';
}

export default function TabLayout() {
  const router = useRouter();
  const segments = useSegments() as string[];
  const current = getCurrentTab(segments);


  const handleTabPress = (key: string) => {
    if (NAV_KEYS.includes(key as NavKey) && key !== current) {
      if (key === 'index') {
        router.replace('/(tabs)'); // Use the root of the tabs for Home
      } else if (key === 'explore') {
        router.replace('/(tabs)/explore');
      }
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <Slot />
      </View>
      <BottomNavBar current={current} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    paddingTop: Platform.OS === 'web' ? 0 : 0,
    paddingBottom: 0,
  },
});
