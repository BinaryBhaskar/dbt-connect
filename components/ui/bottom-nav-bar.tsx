import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from './icon-symbol';

const NAV_ITEMS = [
  { key: 'index', icon: 'house.fill', label: 'Home' },
  { key: 'dbt', icon: 'chevron.left.forwardslash.chevron.right', label: 'DBT Check' },
  { key: 'scholarships', icon: 'chevron.right', label: 'Scholarships' },
  { key: 'explore', icon: 'paperplane.fill', label: 'Explore' },
];

export const BottomNavBar = ({ current, onTabPress }: { current: string; onTabPress: (key: string) => void }) => {
  // Pure white background
  const backgroundColor = '#fff';
  // Light blue for selected tab
  const selectedBg = '#e0f0ff';
  const selectedColor = '#0a7ea4';
  const textColor = '#687076';
  return (
    <View style={[styles.container, { backgroundColor }]}> 
      {NAV_ITEMS.map(item => {
        const isSelected = current === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.tab, isSelected && { backgroundColor: selectedBg, borderRadius: 12 }]}
            activeOpacity={0.7}
            onPress={() => onTabPress(item.key)}
          >
            <IconSymbol
              name={item.icon as any}
              size={28}
              color={isSelected ? selectedColor : textColor}
            />
            <Text style={{ fontSize: 11, color: isSelected ? selectedColor : textColor, marginTop: 2 }}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Platform.OS === 'web' ? 56 : 56,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 10,
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
});
