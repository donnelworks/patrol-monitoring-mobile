import {Modal, Animated, Image, StyleSheet, TouchableOpacity, View, Platform, UIManager, Dimensions, LayoutAnimation} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {colors} from '@styles';
import { Grid, Icon } from '@themes';
import Text from './Text';
import { isBase64, mediaurl } from '@helpers';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const ImageInput = ({images, onPickImage, onRemoveImage}) => {
    const [layoutData, setLayoutData] = useState(null);
    const [imageData, setImageData] = useState(null);

    if (!images?.length) {
      return (
        <TouchableOpacity style={styles.takePhoto} onPress={onPickImage}>
          <Icon.CameraPlus size={20} strokeColor={colors.gray} fillColor={colors.softGray} style={{marginRight: 10}} />
          <Text type="OpenSansSemiBold" color="gray">Tambahkan Foto</Text>
        </TouchableOpacity>
      )
    }

    return (
        <>
            <View style={styles.container}>
              <Grid.Row rowStyles={{marginBottom: -5}}>
                {images?.map(image => {
                  return (
                    <Grid.Col xs={3} key={image} colStyles={{backgroundColor: 'red'}}>
                      <ImageItem image={image} toggleModal={(image, data) => {
                        setImageData(image);
                        setLayoutData(data);
                      }} />
                    </Grid.Col>
                  )
                })}
                {onPickImage && (
                  <Grid.Col xs={3}>
                    <TouchableOpacity style={styles.addPhoto} onPress={onPickImage}>
                      <Icon.CameraPlus size={20} strokeColor={colors.gray} fillColor={colors.softGray} />
                    </TouchableOpacity>
                  </Grid.Col>
                )}
              </Grid.Row>
            </View>
            {layoutData !== null && (
                <ModalView image={imageData} layoutData={layoutData} close={() => setLayoutData(null)} onRemove={onRemoveImage} />
            )}
        </>
    )
};

const ModalView = ({image, layoutData, close, onRemove}) => {
    const { x, y, _width, _height } = layoutData;
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        setExpanded(true);
      }, 10);
    }, []);

    const onRequestRemove = (image) => {
      onRequestClose();
      onRemove(image);
    }

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
                uri: isBase64(image) ? "data:image/jpg;base64," + image : mediaurl + image,
              }}
              resizeMode="cover"
              style={styles.fill}
            />
            {expanded && (
              <>
                {onRemove && (
                  <Icon.Trash size={30} fillColor='none' strokeColor='#FFFFFF' style={styles.remove} onPress={() => onRequestRemove(image)} />
                )}
                <Icon.CrossCircle size={30} fillColor='none' strokeColor='#FFFFFF' style={styles.close} onPress={onRequestClose} />
              </>
            )}
          </View>
        </View>
      </Modal>
    );
};

const ImageItem = ({image, toggleModal}) => {
    const imageRef = useRef(null);

    const onToggleModal = (image) => {
        if (imageRef.current) {
            imageRef.current.measureInWindow((x, y, _width, _height) => {
                toggleModal(image, {
                    x,
                    y,
                    _width,
                    _height,
                });
            });
        }
    };

    return (
      <TouchableOpacity ref={imageRef} onPress={() => onToggleModal(image)} style={{marginBottom: 5}}>
        <Image
            style={{
              height: 80,
              width: 80,
              borderRadius: 8,
              backgroundColor: 'transparent',
            }}
            source={{uri: isBase64(image) ? "data:image/jpg;base64," + image : mediaurl + image}}
            resizeMode="cover"
        />
      </TouchableOpacity>
    );
};

export default ImageInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.softGray,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  remove: {
    position: 'absolute',
    right: 60,
    top: 10,
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
  takePhoto: {
    flexDirection: 'row',
    backgroundColor: colors.softGray,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: colors.gray
  },
  addPhoto: {
    backgroundColor: colors.softGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'dotted',
    borderColor: colors.gray,
    height: 80,
    width: 80,
  }
});
