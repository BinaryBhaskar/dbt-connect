import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppBar from '../../components/ui/app-bar';
import globalStyles from '../../constants/globalStyles';
import { useRouter } from 'expo-router';
import FloatingActionButton from '../../components/ui/fab';

import { checkDBTStatus } from '../../services/backendManager';

export default function DBTScreen() {
  const router = useRouter();
  const [aadhaar, setAadhaar] = useState('');
  const [account, setAccount] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await checkDBTStatus(aadhaar, account);
      setResult(res.message);
    } catch (e) {
      setResult('Error checking status.');
    }
    setLoading(false);
  };

  return (
    <View style={globalStyles.container}>
      <AppBar />
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'transparent', paddingTop: 28}}>
        <View style={[{width: '92%', maxWidth: 420, backgroundColor: '#fff', borderRadius: 16, padding: 24}, globalStyles.shadowCard]}>
          <Text style={{fontSize: 20, fontWeight: '600', color: '#222'}}>DBT & Aadhaar Status Checker</Text>
          <Text style={{color: '#475569', marginTop: 6, marginBottom: 18}}>
            Check if your bank account is Aadhaar-linked and DBT-enabled
          </Text>
          <Text style={{fontWeight: '600', marginBottom: 4, color: '#222'}}>Aadhaar Number</Text>
          <TextInput
            style={{backgroundColor: '#f1f5f9', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 16, color: '#64748b'}}
            placeholder="XXXX-XXXX-XXXX"
            placeholderTextColor="#94a3b8"
            editable={!loading}
            keyboardType="number-pad"
            value={aadhaar}
            onChangeText={setAadhaar}
          />
          <Text style={{fontWeight: '600', marginBottom: 4, color: '#222'}}>Bank Account Number</Text>
          <TextInput
            style={[{backgroundColor: '#f1f5f9', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 24, color: '#222'}]}
            placeholder="Enter your account number"
            placeholderTextColor="#94a3b8"
            keyboardType="number-pad"
            editable={!loading}
            value={account}
            onChangeText={setAccount}
          />
          <TouchableOpacity
            style={{backgroundColor: '#93b4fa', borderRadius: 8, paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', opacity: loading ? 0.7 : 1}}
            onPress={handleCheck}
            disabled={loading}
          >
            <Text style={{fontSize: 18, color: '#fff', marginRight: 8}}>🔍</Text>
            <Text style={{fontSize: 16, color: '#fff', fontWeight: '600'}}>{loading ? 'Checking...' : 'Check Status'}</Text>
          </TouchableOpacity>
          {result && (
            <Text style={{marginTop: 18, color: '#2563eb', fontWeight: 'bold', textAlign: 'center'}}>{result}</Text>
          )}
        </View>
      </View>
      <FloatingActionButton onPress={() => router.push('/chat')} />
    </View>
  );
}
