
import { ResizeMode, Video } from 'expo-av';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../../constants/globalStyles';
import { fetchScholarships, Scholarship } from '../../services/backendManager';

const MOCK_MEDIA = [
  { type: 'image', uri: require('../../assets/images/icon.png') },
  { type: 'image', uri: require('../../assets/images/favicon.png') },
  // Add more images or video URIs as needed
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Closing Soon':
      return '#f97316'; // orange
    case 'Alert':
      return '#ef4444'; // red
    case 'Open':
      return '#22c55e'; // green
    default:
      return '#a3a3a3'; // gray
  }
};

const windowHeight = Dimensions.get('window').height;
const NAV_BAR_HEIGHT = 56;
const APP_BAR_HEIGHT = 56; // adjust if your AppBar is a different height
const REEL_HEIGHT = windowHeight - NAV_BAR_HEIGHT - APP_BAR_HEIGHT;

function SideButtons({ onShare, onApply, statusColor }: { onShare: () => void; onApply: () => void; statusColor: string }) {
  return (
    <View style={styles.sideButtons}>
      <TouchableOpacity style={styles.iconButton} onPress={onShare}>
        <Text style={styles.icon}>🔗</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onApply}>
        <Text style={styles.icon}>📝</Text>
      </TouchableOpacity>
      <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
    </View>
  );
}

function SchemeReel({ item, media, onShare, onApply }: { item: Scholarship; media: any; onShare: () => void; onApply: () => void }) {
  return (
    <View style={[styles.reelContainer, { height: REEL_HEIGHT }]}> 
      <View style={styles.mediaContainer}>
        {media.type === 'image' ? (
          <Image source={media.uri} style={styles.media} resizeMode="contain" />
        ) : (
          <Video
            source={media.uri}
            style={styles.media}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls={false}
            shouldPlay
            isLooping
          />
        )}
      </View>
      <SideButtons
        onShare={onShare}
        onApply={onApply}
        statusColor={getStatusColor(item.status)}
      />
      <View style={[styles.infoContainer, { bottom: NAV_BAR_HEIGHT + 16 }]} pointerEvents="box-none">
        <Text style={styles.schemeNameWithShadow}>{item.name}</Text>
        <Text style={styles.infoTextWithShadow}>Type: {item.type} {item.state ? `/ ${item.state}` : ''}</Text>
        <Text style={styles.infoTextWithShadow}>Audience: {item.audience}</Text>
        <Text style={styles.infoTextWithShadow}>Amount: {item.amount}</Text>
        <Text style={styles.infoTextWithShadow}>Deadline: {item.deadline || 'N/A'}</Text>
        <Text style={styles.infoTextWithShadow}>Status: {item.status}</Text>
      </View>
    </View>
  );
}

export default function ExploreScreen() {
  const router = useRouter();
  const [schemes, setSchemes] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScholarships().then(data => {
      setSchemes(data);
      setLoading(false);
    });
  }, []);

  const handleShare = async (item: Scholarship) => {
    try {
      await Share.share({
        message: `Check out this scheme: ${item.name}\nAudience: ${item.audience}\nDeadline: ${item.deadline}`,
      });
    } catch (error) {
      // ignore
    }
  };

  const handleApply = (item: Scholarship) => {
    // TODO: Implement navigation to apply screen or external link
    alert('Apply for: ' + item.name);
  };

  if (loading) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}> 
        <Text style={{ color: '#fff' }}>Loading...</Text>
      </View>
    );
  }

  // For demo, cycle through mock media for each scheme
  const getMediaForIndex = (idx: number) => MOCK_MEDIA[idx % MOCK_MEDIA.length];

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Fixed top overlays */}
      <View style={styles.topLeftOverlay} pointerEvents="none">
        <Text style={styles.dbtConnectText}>DBT Connect</Text>
      </View>
      <View style={styles.topRightOverlay}>
        <TouchableOpacity
          style={globalStyles.iconBtn}
          onPress={() => router.push('/notification')}
        >
          <Text style={{ fontSize: 18 }}>🔔</Text>
          <View style={globalStyles.dot} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={schemes}
        keyExtractor={item => item.id.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <SchemeReel
            item={item}
            media={getMediaForIndex(index)}
            onShare={() => handleShare(item)}
            onApply={() => handleApply(item)}
          />
        )}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: NAV_BAR_HEIGHT + 32 }}
        snapToInterval={REEL_HEIGHT}
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
    topLeftOverlay: {
      position: 'absolute',
      top: 24,
      left: 16,
      zIndex: 3,
    },
    topRightOverlay: {
      position: 'absolute',
      top: 24,
      right: 16,
      zIndex: 3,
    },
    dbtConnectText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 22,
      textShadowColor: 'rgba(0,0,0,0.8)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 6,
      letterSpacing: 1,
    },
  reelContainer: {
    width: '100%',
    position: 'relative',
    justifyContent: 'flex-end',
    backgroundColor: '#000',
  },
  mediaContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  media: {
    width: '100%',
    height: '100%',
  },
  sideButtons: {
    position: 'absolute',
    right: 16,
    top: '40%',
    zIndex: 2,
    alignItems: 'center',
    gap: 18,
  },
  iconButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 24,
    padding: 10,
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
    color: '#fff',
  },
  statusDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginTop: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  infoContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 2,
    // No background or borderRadius, just overlay text
    padding: 0,
  },
  schemeNameWithShadow: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  infoTextWithShadow: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 2,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
});