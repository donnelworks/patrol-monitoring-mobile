import {Modal, Animated, Button, Image, StyleSheet, TouchableOpacity, View, Platform, UIManager, Dimensions, LayoutAnimation} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {colors} from '@styles';
import { Icon } from '@themes';

const { width } = Dimensions.get('screen');

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const ImagePopup = ({image}) => {
    const [layoutData, setLayoutData] = useState(null);
    return (
        <View>
            <ImageItem image={image} toggleModal={(data) => setLayoutData(data)} />
            {layoutData !== null && (
                <ModalView image={image} layoutData={layoutData} close={() => setLayoutData(null)} />
            )}
        </View>
    )
};

const ModalView = ({image, layoutData, close}) => {
    const { x, y, _width, _height } = layoutData;
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        setExpanded(true);
      }, 10);
    }, []);

    const onRequestClose = () => {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          150,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.opacity,
        ),
        () => {
          close();
        },
      );
      setExpanded(false);
    };

    return (
      <Modal visible onRequestClose={onRequestClose} transparent>
        <View style={styles.center}>
          {expanded && (
            <Animated.View
              style={[StyleSheet.absoluteFill, { backgroundColor: '#000000aa' }]}
            />
          )}
          <View
            style={[
              expanded
                ? { height: '90%', width: '95%' }
                : {
                  height: _height,
                  width: _width,
                  left: x,
                  top: y,
                  position: 'absolute',
                },
              { backgroundColor: '#ccc', overflow: 'hidden', borderRadius: 10 },
            ]}>
            <Image
              source={{
                uri: image,
              }}
              resizeMode="cover"
              style={styles.fill}
            />
            {expanded && (
              <View style={styles.close}>
                {/* <Button title="close" onPress={onRequestClose} /> */}
                <Icon.CrossCircle size={30} fillColor='none' strokeColor='#FFFFFF' onPress={onRequestClose} />
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
};

const ImageItem = ({image, toggleModal}) => {
    const imageRef = useRef(null);

    const onToggleModal = () => {
        if (imageRef.current) {
            imageRef.current.measureInWindow((x, y, _width, _height) => {
                toggleModal({
                    x,
                    y,
                    _width,
                    _height,
                });
            });
        }
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity ref={imageRef} onPress={onToggleModal}>
          <Image
              style={{
                height: 200,
                width: 200,
                borderRadius: 8,
                backgroundColor: '#000000',
              }}
              source={{uri: image}}
              resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
};

export default ImagePopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.softGray,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
});
