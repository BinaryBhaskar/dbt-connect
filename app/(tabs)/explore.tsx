
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AppBar from '../../components/ui/app-bar';
import globalStyles from '../../constants/globalStyles';
import { Center, fetchCenters } from '../../services/backendManager';

function StatusChip({ status }: { status: string }) {
  let color = '#22c55e';
  let bg = '#dcfce7';
  if (status === 'Closed') { color = '#ef4444'; bg = '#fee2e2'; }
  return (
    <View style={{backgroundColor: bg, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start', marginLeft: 8}}>
      <Text style={{color, fontWeight: 'bold', fontSize: 13}}>{status}</Text>
    </View>
  );
}

function TypeChip({ type }: { type: string }) {
  let color = '#2563eb', bg = '#e0e7ff';
  if (type === 'Bank') { color = '#047857'; bg = '#d1fae5'; }
  if (type === 'Government') { color = '#a21caf'; bg = '#f3e8ff'; }
  if (type === 'CSC') { color = '#0ea5e9'; bg = '#e0f2fe'; }
  return (
    <View style={{backgroundColor: bg, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginRight: 6}}>
      <Text style={{color, fontWeight: 'bold', fontSize: 13}}>{type}</Text>
    </View>
  );
}

export default function ExploreScreen() {
  const [centers, setCenters] = useState<Center[]>([]);
  const [initialRegion, setInitialRegion] = useState<any | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let mounted = true;
    fetchCenters().then(data => {
      if (mounted) {
        setCenters(data);
        if (data.length > 0) {
          setInitialRegion({
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      }
    });
    return () => { mounted = false; };
  }, []);

  const handleMarkerPress = (center: Center) => {
    alert(`Directions to ${center.name}`);
  };

  return (
    <View style={globalStyles.container}>
      <AppBar />
      <ScrollView contentContainerStyle={{padding: 16, paddingBottom: 100}}>
        {/* Find Centers Box */}
        <View style={[{backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 18}, globalStyles.shadowCard]}>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: '#222', marginBottom: 4}}>Find Nearest Help Centers</Text>
          <Text style={{color: '#64748b', fontSize: 13, marginBottom: 12}}>Locate CSC centers, banks, and help desks for DBT seeding</Text>
          <TextInput
              style={{flex: 1, backgroundColor: '#f1f5f9', borderRadius: 8, padding: 10, fontSize: 15, color: '#222', marginBottom: 12, width: '100%'}}
              placeholder="Enter your PIN/Location..."
              placeholderTextColor="#94a3b8"
              value={search}
              onChangeText={setSearch}
            />
          <View style={{flexDirection: 'row', alignItems: 'center', gap: '2%', marginBottom: 10}}>
            <TouchableOpacity style={{backgroundColor: '#2563eb', borderRadius: 8, paddingHorizontal: 18, paddingVertical: 10, width: '49%', alignItems: 'center'}}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>Search Centers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: '#f1f5f9', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10, width: '49%', alignItems: 'center'}}>
              <Text style={{color: '#2563eb', fontWeight: 'bold'}}>Use Location</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Map View Box */}
        <View style={[{backgroundColor: '#f1f5f9', borderRadius: 16, padding: 12, marginBottom: 18, alignItems: 'center'}, globalStyles.shadowCard]}>
          {initialRegion && (
            <MapView
              style={{width: Dimensions.get('window').width - 56, height: 240, borderRadius: 12}}
              initialRegion={initialRegion}
            >
              {centers.map(center => (
                <Marker
                  key={center.id}
                  coordinate={{ latitude: center.latitude, longitude: center.longitude }}
                  title={center.name}
                  description={center.address}
                  onPress={() => handleMarkerPress(center)}
                />
              ))}
            </MapView>
          )}
        </View>

        {/* Nearby Centers */}
        <Text style={{fontWeight: 'bold', fontSize: 16, color: '#222', marginBottom: 8}}>Nearby Centers <Text style={{color: '#64748b', fontSize: 13}}>{centers.length} found</Text></Text>
        {centers.map(item => (
          <CenterCard key={item.id} item={item} />
        ))}

        {/* Info Box */}
        <View style={[{backgroundColor: '#f1f5f9', borderRadius: 14, padding: 18, marginTop: 10}, globalStyles.shadowCard]}>
          <Text style={{fontWeight: 'bold', color: '#222', fontSize: 15, marginBottom: 8}}>What can you do at these centers?</Text>
          <Text style={{color: '#475569', fontSize: 13, marginBottom: 4}}>- Check DBT and Aadhaar linking status</Text>
          <Text style={{color: '#475569', fontSize: 13, marginBottom: 4}}>- Complete Aadhaar seeding process</Text>
          <Text style={{color: '#475569', fontSize: 13, marginBottom: 4}}>- Get help with scholarship applications</Text>
          <Text style={{color: '#475569', fontSize: 13}}>Download required documents</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function CenterCard({ item }: { item: Center }) {
  return (
    <View style={[{backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 16}, globalStyles.shadowCard]}> 
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <View style={{flex: 1}}>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: '#222', marginBottom: 2}}>{item.name}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 6}}>
            <TypeChip type={item.type} />
          </View>
          <Text style={{color: '#475569', fontSize: 13, marginBottom: 2}}>{item.address}</Text>
          <Text style={{color: '#64748b', fontSize: 12, marginBottom: 2}}>{item.distance}</Text>
          <Text style={{color: '#64748b', fontSize: 12, marginBottom: 2}}>📞 {item.phone}</Text>
          <Text style={{color: '#64748b', fontSize: 12, marginBottom: 2}}>{item.hours}</Text>
        </View>
        <StatusChip status={item.status} />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, gap: 10}}>
        <TouchableOpacity style={{backgroundColor: '#f1f5f9', borderRadius: 8, paddingHorizontal: 18, paddingVertical: 8}}>
          <Text style={{color: '#2563eb', fontWeight: 'bold'}}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: '#2563eb', borderRadius: 8, paddingHorizontal: 18, paddingVertical: 8}}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Get Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
