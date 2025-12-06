import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../../constants/globalStyles';
import BellIcon from '../../assets/ui/bell.svg';

export default function AppBar() {
  const router = useRouter();
  return (
    <View style={globalStyles.header}>
      <View style={globalStyles.headerLeft}>
        <View style={globalStyles.logoCircle}><Text style={{color:'#2563eb',fontWeight:'bold'}}>₹</Text></View>
        <View>
          <Text style={globalStyles.headerTitle}>DBT Connect</Text>
          <Text style={globalStyles.headerSubtitle}>Ministry of Social Justice and Empowerment</Text>
        </View>
      </View>
      <View style={globalStyles.headerRight}>
        <TouchableOpacity style={globalStyles.iconBtn} onPress={() => router.push('/notification')}>
          <BellIcon width={24} height={24} fill="#ffffff00"/>
          <View style={globalStyles.dot} />
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.langBtn}>
          <Text style={{color:'#fff'}}>🌐 English</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
