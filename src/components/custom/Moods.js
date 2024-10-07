import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../constants/color';
import {font} from '../constants/font';

export default function Moods({title, data}) {
  const [active, setActive] = useState(true);
  return (
    <View style={{paddingHorizontal: 14}}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              onPress={() => setActive(index)}
              style={[
                styles.moodBtnContainer,
                {backgroundColor: index === active ? 'chocolate' : '#ffffff06'},
              ]}>
              <Text style={styles.moodText}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginVertical: 24,
  },
  headerTitle: {
    fontSize: 18,
    color: colors.light,
    fontFamily: font.Montserrat_Medium,
  },
  moodText: {
    fontFamily: font.Montserrat_Regular,
    color: colors.light,
  },
  moodBtnContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff06',
    marginRight: 8,
  },
});
