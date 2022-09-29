// Imported from old repo - major changes still needed
/*
import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Swiper from 'react-native-swiper';

const Gallery = () => {
  const [isImgLarge, setIsImgLarge] = useState(false);
  const [idx, setIdx] = useState(0);

  return (
    <SafeAreaView>
      <ScrollView>
        {
          isImgLarge
            ? (
              <Swiper
                loop={false}
                index={idx}
              >
                {
                  pics.map((res, index) => (
                    <View
                      key={index}
                      style={styles.imgLargeView}
                    >
                      <Image
                        style={styles.imgLarge}
                        resizeMode='contain'
                        source={{ url: res.url }}
                      />
                      <View
                        style={styles.imgLargeButton}
                      >
                        <Button
                          title='Delete Photo'
                          onPress={async () => {
                            await removePhoto(users._id, res.url, res._id, res.createdAt);
                            setIsImgLarge(false);
                          }}
                        />
                        <Button
                          title='Close'
                          onPress={() => {
                            setIsImgLarge(false);
                          }}
                        />
                      </View>
                    </View>
                  ))
                }
              </Swiper>
            )
            : (
              <View
                style={styles.imgSmallView}
              >
                {
                  pics.map((res, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.imgSmallOpacity}
                      onPress={() => {
                        setIsImgLarge(true)
                        setIdx(index)
                      }}
                    >
                      <Image
                        style={styles.imgLarge}
                        source={{ url: res.url }}
                      />
                    </TouchableOpacity>
                  ))
                }
              </View>
            )
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imgLargeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
  },
  imgLarge: {
    width: '100%',
    flex: 1,
  },
  imgLargeButton: {
    position: 'absolute',
    bottom: 60,
  },
  imgSmallView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imgSmallOpacity: {
    height: 100,
    minWidth: 100,
    flex: 1,
  },
  imgSmall: {
    height: 100,
    minWidth: 100,
    flex: 1,
  },
});

export default Gallery;
*/