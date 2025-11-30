import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

interface FABProps {
  onPress: () => void;
}

const FloatingActionButton: React.FC<FABProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.fab} onPress={onPress} activeOpacity={0.8}>
    <Ionicons name="chatbubble-ellipses" size={28} color="#fff" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 24,
    bottom: Platform.OS === 'ios' ? 44 : 24,
    backgroundColor: '#2563eb',
    borderRadius: 32,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 100,
  },
});

export default FloatingActionButton;
