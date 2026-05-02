import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  StatusBar,
  ViewToken,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { useAppStore } from '../../store/useAppStore';

const slides = [
  {
    id: '1',
    title: 'Smart Logistics System',
    description: 'Optimize your delivery flow with our AI-powered intelligent tracking and routing system.',
    image: require('../../assets/images/welcome_delivery.png'),
    icon: 'cube-outline',
  },
  {
    id: '2',
    title: 'Advanced Fleet Management',
    description: 'Monitor your vehicles in real-time, manage schedules, and optimize maintenance cycles.',
    image: require('../../assets/images/fleet_management.png'),
    icon: 'car-outline',
  },
  {
    id: '3',
    title: 'Real-time Live Tracking',
    description: 'Get precise location updates and dynamic ETA calculations for every single shipment.',
    image: require('../../assets/images/live_tracking.png'),
    icon: 'location-outline',
  },
  {
    id: '4',
    title: 'Empower Your Business',
    description: 'Join the next generation of logistics efficiency and scale your operations globally.',
    image: require('../../assets/images/get_started.png'),
    icon: 'rocket-outline',
  },
];

const OnboardingScreen = ({ navigation }: any) => {
  const { width } = useWindowDimensions();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const setHasSeenOnboarding = useAppStore((state) => state.setHasSeenOnboarding);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setCurrentSlideIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex < slides.length) {
      flatListRef.current?.scrollToIndex({ index: nextSlideIndex, animated: true });
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = () => {
    setHasSeenOnboarding(true);
  };

  const Slide = ({ item, index }: { item: typeof slides[0], index: number }) => {
    return (
      <View style={[styles.slide, { width }]}>
        <View style={styles.imageSection}>
          <View style={styles.imageBackdrop}>
             <LinearGradient
              colors={['rgba(232, 35, 42, 0.08)', 'transparent']}
              style={styles.gradientCircle}
            />
          </View>
          <Image source={item.image} style={styles.image} resizeMode="contain" />
        </View>
        
        <View style={styles.contentSection}>
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              style={styles.iconGradient}
            >
              <Ionicons name={item.icon as any} size={28} color="#fff" />
            </LinearGradient>
          </View>
          
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          pagingEnabled
          data={slides}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => <Slide item={item} index={index} />}
          keyExtractor={(item) => item.id}
          bounces={false}
        />

        <View style={styles.footer}>
          <View style={styles.indicatorContainer}>
            {slides.map((_, index) => {
              const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
              const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [8, 24, 8],
                extrapolate: 'clamp',
              });
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.indicator,
                    { width: dotWidth, opacity, backgroundColor: colors.primary }
                  ]}
                />
              );
            })}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.skipButton} 
              onPress={finishOnboarding}
              activeOpacity={0.7}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={goToNextSlide}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                style={styles.nextButton}
              >
                <Text style={styles.nextButtonText}>
                  {currentSlideIndex === slides.length - 1 ? 'Get Started' : 'Next'}
                </Text>
                <Ionicons 
                  name={currentSlideIndex === slides.length - 1 ? "rocket" : "arrow-forward"} 
                  size={20} 
                  color="#fff" 
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  slide: {
    flex: 1,
  },
  imageSection: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 20,
  },
  imageBackdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientCircle: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  image: {
    width: '85%',
    height: '85%',
  },
  contentSection: {
    flex: 0.5,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  iconGradient: {
    width: 64,
    height: 64,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 34,
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 40,
    gap: 32,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    height: 10,
    alignItems: 'center',
  },
  indicator: {
    height: 8,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  skipText: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.textMuted,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 20,
    gap: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.white,
  },
});

export default OnboardingScreen;