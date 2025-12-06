import { ResizeMode, Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Pressable, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalStyles from '../../constants/globalStyles';
import { fetchScholarships, Scholarship } from '../../services/backendManager';
import { useMute } from '../context/MuteContext';
import BellIcon from '../../assets/ui/bell.svg';
import VolumeOnIcon from '../../assets/ui/volume_on.svg';
import VolumeOffIcon from '../../assets/ui/volume_off.svg';

const NAV_BAR_HEIGHT = 56;
const APP_BAR_HEIGHT = 56;
const windowHeight = Dimensions.get('window').height;
const REEL_HEIGHT = windowHeight - NAV_BAR_HEIGHT - APP_BAR_HEIGHT;

const styles = StyleSheet.create({
        infoOverlay: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 140,
          zIndex: 1,
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
        },
      muteButton: {
        position: 'absolute',
        right: 18,
        bottom: 64,
        backgroundColor: 'rgba(0,0,0,0.55)',
        borderRadius: 22,
        padding: 10,
        zIndex: 20,
      },
      muteIcon: {
        fontSize: 26,
        color: '#fff',
        textShadowColor: '#000',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
      },
    pausedOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.18)',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 11,
    },
    pausedIcon: {
      color: '#fff',
      fontSize: 54,
      fontWeight: 'bold',
      textShadowColor: '#000',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 6,
      opacity: 0.85,
    },
  topLeftOverlay: {
    position: 'absolute',
    top: 24,
    left: 16,
    zIndex: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  statusChip: {
    marginTop: 6,
    borderRadius: 16,
    backgroundColor: '#64748b',
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusChipText: {
    fontWeight: '600',
    fontSize: 13,
    color: '#fff',
    letterSpacing: 0.2,
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  media: {
    width: '100%',
    height: '100%',
  },
  fastForwardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  fastForwardText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  infoContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 2,
    padding: 0,
    bottom: NAV_BAR_HEIGHT + 16,
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
  descriptionText: {
    color: '#e0e7ef',
    fontSize: 15,
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  applyChip: {
    backgroundColor: '#2563eb',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  applyChipText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  shareChip: {
    borderColor: '#2563eb',
    borderWidth: 1.5,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareChipText: {
    color: '#2563eb',
    fontWeight: '600',
    fontSize: 15,
  },
});

const MOCK_MEDIA = [
  { type: 'image', uri: require('../../assets/images/govt1.png') },
  { type: 'image', uri: require('../../assets/images/govt2.png') },
  { type: 'video', uri: require('../../assets/videos/test1.mp4') },
  { type: 'video', uri: require('../../assets/videos/test2.mp4') },
  // Add more images or video URIs as needed
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Closing Soon':
      return '#f98416'; // orange
    case 'Alert':
      return '#ef4444'; // red
    case 'Open':
      return '#22c55e'; // green
    case 'Inactive':
      return '#64748b'; // gray-blue
    case 'Info':
      return '#2563eb'; // blue
    default:
      return '#a3a3a3'; // gray
  }
};

function SchemeReel({ item, media, onShare, onApply, isActive }: { item: Scholarship; media: any; onShare: () => void; onApply: () => void; isActive: boolean }) {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(isActive);
  const [isFastForwarding, setIsFastForwarding] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const { isMuted, setIsMuted } = useMute();
  const lastTap = useRef<number>(0);
  const singleTapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Optimization: Only render Video if active
  const shouldRenderVideo = media.type === 'video' && isActive;

  // Sync play/pause with isActive
  useEffect(() => {
    setIsPlaying(isActive);
    if (videoRef.current) {
      if (isActive) videoRef.current.playAsync();
      else videoRef.current.pauseAsync();
    }
  }, [isActive]);

  // Video gesture handlers
  const handlePress = () => {
    if (media.type !== 'video') return;
    setIsPlaying((prev) => {
      if (videoRef.current) {
        if (prev) videoRef.current.pauseAsync();
        else videoRef.current.playAsync();
      }
      return !prev;
    });
  };
  const handleDoublePress = () => {
    if (media.type !== 'video') return;
    if (videoRef.current) videoRef.current.setPositionAsync(0);
  };
  const handleLongPress = () => {
    if (media.type !== 'video') return;
    setIsFastForwarding(true);
    if (videoRef.current) videoRef.current.setRateAsync(2.0, true);
  };
  const handlePressOut = () => {
    if (media.type !== 'video') return;
    setIsFastForwarding(false);
    if (videoRef.current) videoRef.current.setRateAsync(1.0, true);
  };

  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      // Double tap detected
      if (singleTapTimeout.current) {
        clearTimeout(singleTapTimeout.current);
        singleTapTimeout.current = null;
      }
      handleDoublePress();
    } else {
      // Possible single tap, wait to confirm it's not a double tap
      singleTapTimeout.current = setTimeout(() => {
        handlePress();
        singleTapTimeout.current = null;
      }, 300);
    }
    lastTap.current = now;
  };

  return (
    <View style={[styles.reelContainer, { height: REEL_HEIGHT }]}> 
      <View style={styles.mediaContainer}>
        {media.type === 'image' ? (
          <Image source={media.uri} style={styles.media} resizeMode="contain" />
        ) : shouldRenderVideo ? (
          <Pressable
            style={styles.media}
            onPress={handleTap}
            onLongPress={handleLongPress}
            onPressOut={handlePressOut}
            delayLongPress={250}
          >
            <Video
              ref={videoRef}
              source={media.uri}
              style={styles.media}
              resizeMode={ResizeMode.CONTAIN}
              useNativeControls={false}
              shouldPlay={isPlaying}
              isLooping
              isMuted={isMuted}
              posterSource={media.poster ? { uri: media.poster } : undefined}
              usePoster={!!media.poster}
              // For best performance, use HLS/DASH URLs if possible
              // Example: source={{ uri: 'https://example.com/video.m3u8' }}
            />
            {/* Mute button bottom right */}
            <TouchableOpacity
              style={styles.muteButton}
              onPress={() => setIsMuted(!isMuted)}
              activeOpacity={0.7}
            >
              {isMuted ? (<VolumeOffIcon width={26} height={26} fill="#ffffff00" />) : (<VolumeOnIcon width={26} height={26} fill="#ffffff00" />)}
            </TouchableOpacity>
            {!isPlaying && !isFastForwarding && (
              <View style={styles.pausedOverlay} pointerEvents="none">
                <Text style={styles.pausedIcon}>⏸</Text>
              </View>
            )}
            {isFastForwarding && (
              <View style={styles.fastForwardOverlay}><Text style={styles.fastForwardText}>2x</Text></View>
            )}
          </Pressable>
        ) : (
          // Show poster/thumbnail if not active
          media.poster ? (
            <Image source={{ uri: media.poster }} style={styles.media} resizeMode="cover" />
          ) : (
            <View style={[styles.media, { backgroundColor: '#222' }]} />
          )
        )}
      </View>
      {/* Gradient overlay for better text contrast */}
      <LinearGradient
        pointerEvents="none"
        colors={["rgba(0,0,0,0.85)", "rgba(0,0,0,0.0)"]}
        style={styles.infoOverlay}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
      />
      <View style={[styles.infoContainer, { bottom: NAV_BAR_HEIGHT + 16 }]} pointerEvents="box-none">
        <Text style={styles.schemeNameWithShadow}>{item.name}</Text>
        {item.description ? (
          <TouchableOpacity activeOpacity={0.7} onPress={() => setDescExpanded((v) => !v)}>
            <Text
              style={styles.descriptionText}
              numberOfLines={descExpanded ? undefined : 2}
              ellipsizeMode="tail"
            >
              {item.description}
            </Text>
          </TouchableOpacity>
        ) : null}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.applyChip} onPress={onApply}>
            <Text style={styles.applyChipText}>
              {['open', 'closing_soon', 'alert'].includes((item.status || '').toLowerCase()) ? 'Apply' : 'More Info'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareChip} onPress={onShare}>
            <Text style={styles.shareChipText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function ExploreScreen() {
  const router = useRouter();
  const [schemes, setSchemes] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 });
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems && viewableItems.length) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  });

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
  const currentStatus = schemes[currentIndex]?.status ?? '';

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Fixed top overlays */}
      <View style={styles.topLeftOverlay} pointerEvents="box-none">
        <Text style={styles.dbtConnectText}>DBT Connect</Text>
        {currentStatus ? (
          <View style={[styles.statusChip, { backgroundColor: getStatusColor(currentStatus) }] }>
            <Text style={styles.statusChipText}>{currentStatus}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.topRightOverlay}>
        <TouchableOpacity
          style={globalStyles.iconBtn}
          onPress={() => router.push('/notification')}
        >
          <BellIcon width={24} height={24} fill="#ffffff00"/>
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
            isActive={index === currentIndex}
          />
        )}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: NAV_BAR_HEIGHT + 32 }}
        snapToInterval={REEL_HEIGHT}
        decelerationRate="fast"
        viewabilityConfig={viewabilityConfig.current}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
}