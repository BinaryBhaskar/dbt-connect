
import { BottomNavBar } from '@/components/ui/bottom-nav-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NAV_KEYS = ['index', 'dbt','explore', 'scholarships' , 'help'] as const;
type NavKey = typeof NAV_KEYS[number];

function getCurrentTab(segments: string[] | undefined): NavKey {
  if (!segments || segments.length === 0) return 'index';
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
      } else if (key === 'help') {
        router.replace('/(tabs)/help');
      } else if (key === 'dbt') {
        router.replace('/(tabs)/dbt');
      } else if (key === 'scholarships') {
        router.replace('/(tabs)/scholarships');
      } else if (key === 'explore') {
        router.replace('/(tabs)/explore');
      }
    }
  };

  // Set system bar colors based on current tab
  useEffect(() => {
    if (current === 'explore') {
      NavigationBar.setBackgroundColorAsync('#000');
      NavigationBar.setButtonStyleAsync('light');
    } else {
      NavigationBar.setBackgroundColorAsync('#fff');
      NavigationBar.setButtonStyleAsync('dark');
    }
  }, [current]);

  const Wrapper = Platform.OS === 'android' ? SafeAreaView : View;
  return (
    <Wrapper
      style={[styles.safeArea, current === 'explore' ? { backgroundColor: '#000' } : { backgroundColor: '#fff' }]}
      {...(Platform.OS === 'android' ? { edges: ['top', 'bottom', 'left', 'right'] } : {})}
    >
      <StatusBar style={current === 'explore' ? 'light' : 'dark'} backgroundColor={current === 'explore' ? '#000' : '#fff'} />
      <View style={[styles.root, current === 'explore' ? { backgroundColor: '#000' } : { backgroundColor: '#fff' }]}> 
        <View style={styles.content}>
          <Slot />
        </View>
        <BottomNavBar current={current} onTabPress={handleTabPress} />
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  root: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 1600,
    alignSelf: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
});