import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppBar from '../../components/ui/app-bar';
import globalStyles from '../../constants/globalStyles';
import { useRouter } from 'expo-router';
import FloatingActionButton from '../../components/ui/fab';

import { fetchScholarships, Scholarship } from '../../services/backendManager';

const SCHOLARSHIP_CATEGORIES = ['All', 'Central', 'State'];

// Data now comes from backendManager

function StatusChip({ status }: { status: string }) {
  let color = '#22c55e';
  let bg = '#dcfce7';
  if (status === 'Closing Soon') { color = '#f97316'; bg = '#ffedd5'; }
  if (status === 'Alert') { color = '#ef4444'; bg = '#fee2e2'; }
  return (
    <View style={{backgroundColor: bg, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start', marginLeft: 8}}>
      <Text style={{color, fontWeight: 'bold', fontSize: 13}}>{status}</Text>
    </View>
  );
}

function TypeChip({ type, state }: { type: string, state?: string }) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
      <View style={{backgroundColor: type === 'Central' ? '#e0e7ff' : '#fef9c3', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginRight: state ? 6 : 0}}>
        <Text style={{color: type === 'Central' ? '#3730a3' : '#92400e', fontWeight: 'bold', fontSize: 13}}>{type}</Text>
      </View>
      {state ? (
        <View style={{backgroundColor: '#f1f5f9', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4}}>
          <Text style={{color: '#334155', fontWeight: 'bold', fontSize: 13}}>{state}</Text>
        </View>
      ) : null}
    </View>
  );
}

function AmountChip({ amount }: { amount: string }) {
  return (
    <View style={{backgroundColor: '#f0fdf4', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginLeft: 6}}>
      <Text style={{color: '#15803d', fontWeight: 'bold', fontSize: 13}}>{amount}</Text>
    </View>
  );
}

function ScholarshipCard({ item }: { item: Scholarship }) {
  return (
    <View style={[{backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 16}, globalStyles.shadowCard]}> 
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <View style={{flex: 1}}>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: '#222', marginBottom: 2}}>{item.name}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 6}}>
            <TypeChip type={item.type} state={item.state} />
            <AmountChip amount={item.amount} />
          </View>
          <Text style={{color: '#475569', fontSize: 13, marginBottom: 2}}>{item.audience}</Text>
          <Text style={{color: '#64748b', fontSize: 12, marginBottom: 2}}>Deadline: {item.deadline}</Text>
        </View>
        <StatusChip status={item.status} />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, gap: 10}}>
        <TouchableOpacity style={{backgroundColor: '#f1f5f9', borderRadius: 8, paddingHorizontal: 18, paddingVertical: 8}}>
          <Text style={{color: '#2563eb', fontWeight: 'bold'}}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: '#2563eb', borderRadius: 8, paddingHorizontal: 18, paddingVertical: 8}}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ScholarshipsScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [pill, setPill] = useState('All');
  const [page, setPage] = useState(1);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const perPage = 6;

  useEffect(() => {
    let mounted = true;
    fetchScholarships().then(data => { if (mounted) setScholarships(data); });
    return () => { mounted = false; };
  }, []);

  const filtered = scholarships.filter(s =>
    (pill === 'All' || s.type === pill) &&
    (search === '' || s.name.toLowerCase().includes(search.toLowerCase()))
  );
  const paged = filtered.slice((page-1)*perPage, page*perPage);
  const totalPages = Math.ceil(filtered.length / perPage) || 1;

  return (
    <View style={globalStyles.container}>
      <AppBar />
      <ScrollView contentContainerStyle={{padding: 16, paddingBottom: 100}}>
        {/* Scholarship Portal Box */}
        <View style={[{backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 18}, globalStyles.shadowCard]}>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: '#222', marginBottom: 4}}>Scholarship Portal</Text>
          <Text style={{color: '#64748b', fontSize: 13, marginBottom: 12}}>All Pre & Post Matric Scholarships (Central + State)</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10}}>
            <TextInput
              style={{flex: 1, backgroundColor: '#f1f5f9', borderRadius: 8, padding: 10, fontSize: 15, color: '#222'}}
              placeholder="Search scholarships..."
              placeholderTextColor="#94a3b8"
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity style={{backgroundColor: '#f1f5f9', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10}}>
              <Text style={{color: '#2563eb', fontWeight: 'bold'}}>All categories ▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pills */}
        <View style={{flexDirection: 'row', gap: 10, marginBottom: 18}}>
          {SCHOLARSHIP_CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={{paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, backgroundColor: pill === cat ? '#2563eb' : '#f1f5f9'}}
              onPress={() => setPill(cat)}
            >
              <Text style={{color: pill === cat ? '#fff' : '#222', fontWeight: 'bold'}}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Scholarship Cards */}
        {paged.map(item => (
          <ScholarshipCard key={item.id} item={item} />
        ))}

        {/* Pagination */}
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12, marginVertical: 18}}>
          <TouchableOpacity
            style={{backgroundColor: page === 1 ? '#e5e7eb' : '#2563eb', borderRadius: 8, paddingHorizontal: 18, paddingVertical: 8}}
            disabled={page === 1}
            onPress={() => setPage(page-1)}
          >
            <Text style={{color: page === 1 ? '#64748b' : '#fff', fontWeight: 'bold'}}>Previous</Text>
          </TouchableOpacity>
          <Text style={{fontWeight: 'bold', color: '#222'}}>Page {page} of {totalPages}</Text>
          <TouchableOpacity
            style={{backgroundColor: page === totalPages ? '#e5e7eb' : '#2563eb', borderRadius: 8, paddingHorizontal: 18, paddingVertical: 8}}
            disabled={page === totalPages}
            onPress={() => setPage(page+1)}
          >
            <Text style={{color: page === totalPages ? '#64748b' : '#fff', fontWeight: 'bold'}}>Next</Text>
          </TouchableOpacity>
        </View>

        {/* Eligibility Box */}
        <View style={[{backgroundColor: '#f1f5f9', borderRadius: 14, padding: 18, marginTop: 10, alignItems: 'center'}, globalStyles.shadowCard]}>
          <Text style={{fontWeight: 'bold', color: '#222', fontSize: 15, marginBottom: 8}}>Not sure which scholarship you qualify for?</Text>
          <Text style={{color: '#475569', fontSize: 13, marginBottom: 12, textAlign: 'center'}}>Use our eligibility checker to find scholarships matching your profile</Text>
          <TouchableOpacity style={{backgroundColor: '#2563eb', borderRadius: 8, paddingHorizontal: 24, paddingVertical: 12}}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 15}}>Check My Eligibility</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FloatingActionButton onPress={() => router.push('/chat')} />
    </View>
  );
}
