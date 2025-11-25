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
  // Light blue for selected tab (updated)
  const selectedBg = '#DBEAFE';
  const selectedColor = '#1447E6';
  const textColor = '#687076';
  return (
    <View style={[styles.container, { backgroundColor }]}> 
      {NAV_ITEMS.map(item => {
        const isSelected = current === item.key;
        // For first and last tab, extend background to screen edge when selected
        const isFirst = item.key === NAV_ITEMS[0].key;
        const isLast = item.key === NAV_ITEMS[NAV_ITEMS.length - 1].key;
        return (
          <View style={styles.tab} key={item.key}>
            {isSelected && (
              <View style={styles.selectedBgBase} pointerEvents="none" />
            )}
            <TouchableOpacity
              style={styles.tabInner}
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
          </View>
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
    // Removed horizontal padding to allow selected tab backgrounds to reach screen edge
    paddingHorizontal: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    height: '100%',
    position: 'relative',
  },
  tabInner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  selectedBgBase: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: '#DBEAFE',
    zIndex: 0,
    left: 0,
    right: 0,
    borderRadius: 0,
  },
});
