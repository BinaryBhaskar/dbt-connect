import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import FloatingActionButton from '../../components/ui/fab';
import AppBar from '../../components/ui/app-bar';
import globalStyles from '../../constants/globalStyles';
import { fetchHomeStats, fetchResources, fetchUpdates, UpdateItem } from '../../services/backendManager';

export default function HomeScreen() {
  const router = useRouter();
  // Example state for real-time updates (loaded from backend manager for now)
  const [stats, setStats] = useState({ schemes: 0, beneficiaries: '0', centers: 0 });
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [resources, setResources] = useState({ posters: 0, videos: 0 });

  useEffect(() => {
    let mounted = true;
    fetchHomeStats().then(data => { if (mounted) setStats(data); }).catch(() => {});
    fetchUpdates().then(data => { if (mounted) setUpdates(data); }).catch(() => {});
    fetchResources().then(data => { if (mounted) setResources(data); }).catch(() => {});
    return () => { mounted = false; };
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView style={globalStyles.container} contentContainerStyle={{ paddingBottom: 100}}>
        {/* Header */}
          <AppBar />
          <View style={{paddingHorizontal:16}}>
            {/* Alert */}
            <View style={[globalStyles.alertBox, globalStyles.shadowCard]}>
              <View style={globalStyles.alertIcon}><Text style={{color:'#fff'}}>!</Text></View>
              <Text style={globalStyles.alertText}>
                <Text style={{fontWeight:'bold'}}>Important: </Text>
                Ensure your DBT seeding is complete before scholarship deadline (Dec 31, 2025)
              </Text>
            </View>

            {/* Stats */}
            <View style={globalStyles.statsRow}>
              <View style={[globalStyles.statCard, globalStyles.shadowCard, {backgroundColor:'#3b82f6'}]}>
                <Text style={globalStyles.statNumber}>{stats.schemes}</Text>
                <Text style={globalStyles.statLabel}>Active Schemes</Text>
              </View>
              <View style={[globalStyles.statCard, globalStyles.shadowCard, {backgroundColor:'#4ade80'}]}>
                <Text style={globalStyles.statNumber}>{stats.beneficiaries}</Text>
                <Text style={globalStyles.statLabel}>Beneficiaries</Text>
              </View>
              <View style={[globalStyles.statCard, globalStyles.shadowCard, {backgroundColor:'#f97316'}]}>
                <Text style={globalStyles.statNumber}>{stats.centers.toLocaleString()}</Text>
                <Text style={globalStyles.statLabel}>Help Centers</Text>
              </View>
            </View>

            {/* Quick Services */}
            <Text style={globalStyles.sectionTitle}>Quick Services</Text>
            <View style={globalStyles.servicesGrid}>
              <ServiceCard icon="📄" color="#3b82f6" title="DBT & Aadhaar Check" desc="Check linking status" />
              <ServiceCard icon="🎓" color="#4ade80" title="Scholarships" desc="View all schemes" />
              <ServiceCard icon="📍" color="#f97316" title="Nearest Centers" desc="Find help nearby" />
              <ServiceCard icon="👥" color="#953be8ff" title="Our Portal" desc="Register & verify" active />
            </View>

            {/* Latest Updates */}
            <View style={[globalStyles.updatesCard, globalStyles.shadowCard]}>
              <Text style={[globalStyles.sectionTitle, {marginBottom:8}]}>Latest Updates</Text>
              {updates.map((u, i) => (
                <View key={i} style={globalStyles.updateItem}>
                  <View style={[globalStyles.updateDot, {backgroundColor: u.color}]} />
                  <View style={globalStyles.updateContent}>
                    <View style={globalStyles.updateHeader}>
                      <Text style={globalStyles.updateText}>{u.text}</Text>
                      {u.badge && <Text style={globalStyles.badge}>{u.badge}</Text>}
                    </View>
                    <Text style={globalStyles.updateTime}>{u.time}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Resources */}
            <View style={[globalStyles.resourcesSection, globalStyles.shadowCard]}>
              <Text style={[globalStyles.sectionTitle, {marginBottom:8}]}>Awareness Resources</Text>
              <View style={globalStyles.resourceButtons}>
                <TouchableOpacity style={globalStyles.resBtn}><Text>📥 Posters ({resources.posters})</Text></TouchableOpacity>
                <TouchableOpacity style={globalStyles.resBtn}><Text>📹 Videos ({resources.videos})</Text></TouchableOpacity>
              </View>
            </View>

            {/* AI Banner */}
            <View style={[globalStyles.aiBanner, globalStyles.shadowCard]}>
              <View style={globalStyles.aiIconCircle}><Text style={{fontSize:24}}>🤖</Text></View>
              <View style={globalStyles.aiText}>
              <Text style={globalStyles.aiTitle}>AI Assistant</Text>
              <Text style={globalStyles.aiDesc}>Get instant help with DBT, scholarships & more</Text>
              <Text style={globalStyles.statusBadge}>24/7 Available</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <FloatingActionButton onPress={() => router.push('/chat')} />
    </View>
  );
}

function ServiceCard({icon, color, title, desc, active}: {icon: string, color: string, title: string, desc: string, active?: boolean}) {
  return (
    <View style={globalStyles.serviceCard}>
      <View style={[globalStyles.iconSq, {backgroundColor: color}]}><Text style={{color:'#fff',fontSize:20}}>{icon}</Text></View>
      <Text style={globalStyles.serviceTitle}>{title}</Text>
      <Text style={globalStyles.serviceDesc}>{desc}</Text>
    </View>
  );
}