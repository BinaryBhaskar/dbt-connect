import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AppBar from '../../components/ui/app-bar';
import globalStyles from '../../constants/globalStyles';

export default function HomeScreen() {
  // Example state for real-time updates
  const [stats, setStats] = useState({
    schemes: 156,
    beneficiaries: '2.4M',
    centers: 1250,
  });

  const updates = [
    {
      color: '#22c55e',
      text: 'New Pre-Matric Scholarship announced for SC/ST students',
      badge: 'New',
      time: '2 days ago',
    },
    {
      color: '#3b82f6',
      text: 'DBT seeding deadline extended to Dec 31',
      time: '5 days ago',
    },
    {
      color: '#f97316',
      text: '500+ new help centers added across rural areas',
      time: '1 week ago',
    },
  ];

  return (
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
            <TouchableOpacity style={globalStyles.resBtn}><Text>📥 Posters</Text></TouchableOpacity>
            <TouchableOpacity style={globalStyles.resBtn}><Text>📹 Videos</Text></TouchableOpacity>
          </View>
        </View>

        {/* AI Banner */}
        <View style={[globalStyles.aiBanner, globalStyles.shadowCard]}>
          <View style={globalStyles.aiIconCircle}><Text style={{fontSize:24}}>💬</Text></View>
          <View style={globalStyles.aiText}>
            <Text style={globalStyles.aiTitle}>AI Assistant</Text>
            <Text style={globalStyles.aiDesc}>Get instant help with DBT, scholarships & more</Text>
            <Text style={globalStyles.statusBadge}>24×7 Available</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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