import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DBTIcon from '../../assets/images/dbt_aadhaar_doc.svg';
import ExploreIcon from '../../assets/images/explore.svg';
import HomeIcon from '../../assets/images/home.svg';
import ScholarshipsIcon from '../../assets/images/scholarships.svg';
import { fetchNavItems, NavItem } from '../../services/backendManager';


export const BottomNavBar = ({ current, onTabPress }: { current: string; onTabPress: (key: string) => void }) => {
  const [navItems, setNavItems] = useState<Array<NavItem & { Svg?: any }>>([]);

  useEffect(() => {
    // Provide Svg components when requesting nav items so icons are preserved
    const defaults = [
      { key: 'index', label: 'Home', Svg: HomeIcon },
      { key: 'dbt', label: 'DBT Check', Svg: DBTIcon },
      { key: 'scholarships', label: 'Scholarships', Svg: ScholarshipsIcon },
      { key: 'explore', label: 'Explore', Svg: ExploreIcon },
    ];
    fetchNavItems(defaults).then(items => setNavItems(items)).catch(() => setNavItems(defaults as any));
  }, []);
  // Pure white background
  const backgroundColor = '#fff';
  const selectedColor = '#1447E6';
  const textColor = '#687076';
  return (
    <View style={[styles.container, { backgroundColor }]}> 
      {navItems.map(item => {
        const isSelected = current === item.key;
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
              <item.Svg
                width={24}
                height={24}
                color={isSelected ? selectedColor : textColor}
                fill={isSelected ? selectedColor : textColor}
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
