import React from 'react';
import { Text, View } from 'react-native';
import AppBar from '../../components/ui/app-bar';
import globalStyles from '../../constants/globalStyles';

export default function ScholarshipsScreen() {
  return (
    <View style={globalStyles.container}>
      <AppBar />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>Scholarships Screen</Text>
        <Text style={{marginTop: 8}}>This is the Scholarships tab.</Text>
      </View>
    </View>
  );
}
