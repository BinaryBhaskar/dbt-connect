import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import globalStyles from '../constants/globalStyles';

export default function NotificationScreen() {
  const router = useRouter();
  const Wrapper = Platform.OS === 'android' ? SafeAreaView : View;

  // Custom back handler: use router.canGoBack if available, else fallback
  const handleBack = () => {
    if (typeof router.canGoBack === 'function' && router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/explore');
    }
  };

  return (
    <Wrapper style={globalStyles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Text style={{fontSize: 22, color: '#2563eb'}}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.empty}>No notifications yet.</Text>
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    gap: 8,
  },
  backBtn: {
    padding: 8,
    marginRight: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  empty: {
    fontSize: 15,
    color: '#64748b',
  },
});
