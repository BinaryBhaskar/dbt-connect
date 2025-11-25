import React from 'react';
import { Text, View } from 'react-native';
import AppBar from '../../components/ui/app-bar';
import globalStyles from '../../constants/globalStyles';

export default function DBTScreen() {
  return (
    <View style={globalStyles.container}>
      <AppBar />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>DBT Screen</Text>
        <Text style={{marginTop: 8}}>This is the DBT tab.</Text>
      </View>
    </View>
  );
}
