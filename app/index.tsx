import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



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
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100}}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoCircle}><Text style={{color:'#2563eb',fontWeight:'bold'}}>₹</Text></View>
          <View>
            <Text style={styles.headerTitle}>DBT Connect</Text>
            <Text style={styles.headerSubtitle}>Ministry of Social Justice and Empowerment</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={{fontSize:18}}>🔔</Text>
            <View style={styles.dot} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.langBtn}>
            <Text style={{color:'#fff'}}>🌐 English</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{paddingHorizontal:16}}>
        {/* Alert */}
        <View style={styles.alertBox}>
          <View style={styles.alertIcon}><Text style={{color:'#fff'}}>!</Text></View>
          <Text style={styles.alertText}>
            <Text style={{fontWeight:'bold'}}>Important: </Text>
            Ensure your DBT seeding is complete before scholarship deadline (Dec 31, 2025)
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, {backgroundColor:'#3b82f6'}]}>
            <Text style={styles.statNumber}>{stats.schemes}</Text>
            <Text style={styles.statLabel}>Active Schemes</Text>
          </View>
          <View style={[styles.statCard, {backgroundColor:'#4ade80'}]}>
            <Text style={styles.statNumber}>{stats.beneficiaries}</Text>
            <Text style={styles.statLabel}>Beneficiaries</Text>
          </View>
          <View style={[styles.statCard, {backgroundColor:'#f97316'}]}>
            <Text style={styles.statNumber}>{stats.centers.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Help Centers</Text>
          </View>
        </View>

        {/* Quick Services */}
        <Text style={styles.sectionTitle}>Quick Services</Text>
        <View style={styles.servicesGrid}>
          <ServiceCard icon="📄" color="#3b82f6" title="DBT & Aadhaar Check" desc="Check linking status" />
          <ServiceCard icon="🎓" color="#4ade80" title="Scholarships" desc="View all schemes" />
          <ServiceCard icon="📍" color="#f97316" title="Nearest Centers" desc="Find help nearby" />
          <ServiceCard icon="👥" color="#a855f7" title="Our Portal" desc="Register & verify" active />
        </View>

        {/* Latest Updates */}
        <View style={styles.updatesCard}>
          <Text style={[styles.sectionTitle, {marginBottom:8}]}>Latest Updates</Text>
          {updates.map((u, i) => (
            <View key={i} style={styles.updateItem}>
              <View style={[styles.updateDot, {backgroundColor: u.color}]} />
              <View style={styles.updateContent}>
                <View style={styles.updateHeader}>
                  <Text style={styles.updateText}>{u.text}</Text>
                  {u.badge && <Text style={styles.badge}>{u.badge}</Text>}
                </View>
                <Text style={styles.updateTime}>{u.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Resources */}
        <View style={styles.resourcesSection}>
          <Text style={[styles.sectionTitle, {marginBottom:8}]}>Awareness Resources</Text>
          <View style={styles.resourceButtons}>
            <TouchableOpacity style={styles.resBtn}><Text>📥 Posters</Text></TouchableOpacity>
            <TouchableOpacity style={styles.resBtn}><Text>📹 Videos</Text></TouchableOpacity>
          </View>
        </View>

        {/* AI Banner */}
        <View style={styles.aiBanner}>
          <View style={styles.aiIconCircle}><Text style={{fontSize:24}}>💬</Text></View>
          <View style={styles.aiText}>
            <Text style={styles.aiTitle}>AI Assistant</Text>
            <Text style={styles.aiDesc}>Get instant help with DBT, scholarships & more</Text>
            <Text style={styles.statusBadge}>24×7 Available</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function ServiceCard({icon, color, title, desc, active}: {icon: string, color: string, title: string, desc: string, active?: boolean}) {
  return (
    <View style={styles.serviceCard}>
      <View style={[styles.iconSq, {backgroundColor: color}]}><Text style={{color:'#fff',fontSize:20}}>{icon}</Text></View>
      <Text style={styles.serviceTitle}>{title}</Text>
      <Text style={styles.serviceDesc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f3f4f6', flex: 1},
  header: {
    backgroundColor: '#2563eb', color: '#fff', padding: 16, paddingTop: 32, flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center', borderBottomLeftRadius: 16, borderBottomRightRadius: 16,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoCircle: { width: 36, height: 36, backgroundColor: '#fff', borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  headerSubtitle: { color: '#fff', fontSize: 12, opacity: 0.9, maxWidth: 160, lineHeight: 14 },
  headerRight: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  iconBtn: { marginRight: 8, position: 'relative' },
  dot: { position: 'absolute', top: 2, right: 2, width: 8, height: 8, backgroundColor: '#ef4444', borderRadius: 4, borderWidth: 1, borderColor: '#2563eb' },
  langBtn: { backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  alertBox: { backgroundColor: '#fff7ed', borderColor: '#fdba74', borderWidth: 1, padding: 12, borderRadius: 12, flexDirection: 'row', gap: 12, alignItems: 'flex-start', marginTop: 16 },
  alertIcon: { backgroundColor: '#f97316', width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
  alertText: { color: '#9a3412', fontSize: 14, flex: 1 },
  statsRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  statCard: { flex: 1, paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  statNumber: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  statLabel: { color: '#fff', fontSize: 12, opacity: 0.9 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#1f2937', marginTop: 24, marginBottom: 10 },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  serviceCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, alignItems: 'center', flexBasis: '48%', marginBottom: 12, borderWidth: 1, borderColor: 'transparent' },
  activeBorder: { borderColor: '#3b82f6', borderWidth: 2 },
  iconSq: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  serviceTitle: { fontSize: 15, color: '#1f2937', marginBottom: 4, fontWeight: '600' },
  serviceDesc: { fontSize: 13, color: '#6b7280' },
  updatesCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginTop: 24 },
  updateItem: { flexDirection: 'row', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  updateDot: { width: 8, height: 8, borderRadius: 4, marginTop: 6 },
  updateContent: { flex: 1 },
  updateHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  updateText: { fontSize: 14, color: '#1f2937', flex: 1 },
  badge: { backgroundColor: '#e5e7eb', fontSize: 12, paddingHorizontal: 6, borderRadius: 4, color: '#374151', fontWeight: '500' },
  updateTime: { fontSize: 12, color: '#9ca3af' },
  resourcesSection: { backgroundColor: '#eff6ff', padding: 16, borderRadius: 12, marginTop: 24 },
  resourceButtons: { flexDirection: 'row', gap: 12 },
  resBtn: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginHorizontal: 2, fontWeight: '500' },
  aiBanner: { backgroundColor: '#2563eb', borderRadius: 16, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 24 },
  aiIconCircle: { width: 50, height: 50, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  aiText: { flex: 1 },
  aiTitle: { fontSize: 16, color: '#fff', fontWeight: '600', marginBottom: 4 },
  aiDesc: { fontSize: 13, color: '#fff', opacity: 0.9, marginBottom: 8 },
  statusBadge: { backgroundColor: '#4ade80', color: '#064e3b', fontSize: 12, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, fontWeight: '600', alignSelf: 'flex-start' },
});