import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../constants/color';

const {width, height} = Dimensions.get('screen');
const ITEM_WIDTH = width / 4;
const ITEM_HEIGHT = ITEM_WIDTH * 1.3;
const SPACING = 8;
const shimmerColors = ['#222', '#333', '#222'];

export const ShimmerExample = () => {
  const album = [...Array(20).keys(0)];
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.light_dark} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}>
        <View style={styles.header}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.shimmerSmall}
            autoRun={true}
            shimmerColors={shimmerColors}
            duration={1000}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.seeAllShimmer}
            autoRun={true}
            shimmerColors={shimmerColors}
            duration={1000}
          />
        </View>
        <FlatList
          data={album}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={(item, index) => (
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={styles.shimmer}
              autoRun={true}
              shimmerColors={shimmerColors}
              duration={1000}
            />
          )}
        />
        <View style={styles.header}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.shimmerSmall}
            autoRun={true}
            shimmerColors={shimmerColors}
            duration={1000}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.seeAllShimmer}
            autoRun={true}
            shimmerColors={shimmerColors}
            duration={1000}
          />
        </View>
        <FlatList
          data={album}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={(item, index) => (
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={styles.shimmer}
              autoRun={true}
              shimmerColors={shimmerColors}
              duration={1000}
            />
          )}
        />
        <View style={styles.header}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.shimmerSmall}
            autoRun={true}
            shimmerColors={shimmerColors}
            duration={1000}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.seeAllShimmer}
            autoRun={true}
            shimmerColors={shimmerColors}
            duration={1000}
          />
        </View>
        <FlatList
          data={album}
          showsVerticalScrollIndicator={false}
          renderItem={(item, index) => (
            <View style={styles.recommendedShimmer}>
              <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                style={styles.recommendedShimmerImage}
                autoRun={true}
                shimmerColors={shimmerColors}
                duration={1000}
              />
              <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                style={styles.recommendedShimmerDetails}
                autoRun={true}
                shimmerColors={shimmerColors}
                duration={1000}
              />
            </View>
          )}
        />
        <View style={styles.header}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.shimmerSmall}
            autoRun={true}
            shimmerColors={shimmerColors}
            duration={1000}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.seeAllShimmer}
            autoRun={true}
            shimmerColors={shimmerColors}
            duration={1000}
          />
        </View>
        <FlatList
          data={album}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={(item, index) => (
            <View style={styles.artistShimmer}>
              <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                style={{width: 100, height: 100, borderRadius: 100}}
                autoRun={true}
                shimmerColors={shimmerColors}
                duration={1000}
              />
              <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                style={{width: '100%', height: 24, marginTop: 10}}
                autoRun={true}
                shimmerColors={shimmerColors}
                duration={1000}
              />
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

export const RecentShimmer = () => {
  const album = [...Array(20).keys(0)];
  return (
    <View style={{paddingLeft: 14}}>
      <View style={styles.header}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.shimmerSmall}
          autoRun={true}
          shimmerColors={shimmerColors}
          duration={1000}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.seeAllShimmer}
          autoRun={true}
          shimmerColors={shimmerColors}
          duration={1000}
        />
      </View>
      <FlatList
        data={album}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={(item, index) => (
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.shimmer}
            autoRun={true}
            shimmerColors={shimmerColors}
            duration={1000}
          />
        )}
      />
    </View>
  );
};

export const RecommendedShimmer = () => {
  const album = [...Array(20).keys(0)];
  return (
    <View style={{paddingHorizontal: 14}}>
      <View style={styles.header}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.shimmerSmall}
          autoRun={true}
          shimmerColors={shimmerColors}
          duration={1000}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.seeAllShimmer}
          autoRun={true}
          shimmerColors={shimmerColors}
          duration={1000}
        />
      </View>
      <FlatList
        data={album}
        showsVerticalScrollIndicator={false}
        renderItem={(item, index) => (
          <View style={styles.recommendedShimmer}>
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={styles.recommendedShimmerImage}
              autoRun={true}
              shimmerColors={shimmerColors}
              duration={1000}
            />
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={styles.recommendedShimmerDetails}
              autoRun={true}
              shimmerColors={shimmerColors}
              duration={1000}
            />
          </View>
        )}
      />
    </View>
  );
};

export const ArtistShimmer = () => {
  const album = [...Array(20).keys(0)];
  return (
    <View style={{paddingLeft: 14}}>
      <View style={styles.header}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.shimmerSmall}
          autoRun={true}
          shimmerColors={shimmerColors}
          duration={1000}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.seeAllShimmer}
          autoRun={true}
          shimmerColors={shimmerColors}
          duration={1000}
        />
      </View>
      <FlatList
        data={album}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={(item, index) => (
          <View style={styles.artistShimmer}>
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={{width: 100, height: 100, borderRadius: 100}}
              autoRun={true}
              shimmerColors={shimmerColors}
              duration={1000}
            />
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={{width: '100%', height: 24, marginTop: 10}}
              autoRun={true}
              shimmerColors={shimmerColors}
              duration={1000}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    backgroundColor: colors.light_dark,
  },

  header: {
    marginVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shimmer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 5,
    marginRight: SPACING,
  },
  recommendedShimmer: {
    width: '100%',
    height: 80,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: SPACING,
    marginVertical: 6,
  },
  shimmerSmall: {
    width: '60%',
    height: 30,
    borderRadius: 3,
  },
  seeAllShimmer: {
    width: '30%',
    height: 30,
    borderRadius: 3,
  },
  recommendedShimmerImage: {
    width: '22%',
    height: 80,
  },
  recommendedShimmerDetails: {
    width: '75%',
    height: 80,
  },
  artistShimmer: {
    width: 100,
    height: 140,
    borderRadius: 100,
    marginRight: SPACING * 2,
  },
});
