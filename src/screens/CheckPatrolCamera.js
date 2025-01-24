import { StyleSheet, View, PanResponder, Dimensions, BackHandler } from 'react-native'
import React, {useRef, useState, useEffect} from 'react'
import { RNCamera } from 'react-native-camera'
import { useIsFocused } from '@react-navigation/native'
import { Icon } from '@themes'

const CheckPatrolCamera = ({navigation}) => {
  const cameraRef = useRef();
  const [photo, setPhoto] = useState(null);
  const [flash, setFlash] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [switchCamera, setSwitchCamera] = useState(false);

  useEffect(() => {
    let backHandler;
    if (photo) {
      backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
        onCancelCapture();
        return true;
      });
    } else {
      backHandler = BackHandler.addEventListener("hardwareBackPress", () => false);
    }

    return () => backHandler.remove();
  }, [photo]);

  const onGoBackHandler = () => {
    if (photo) {
      onCancelCapture();
      return true;
    } else {
      navigation.goBack();
      return false;
    }
  }

  const onCapture = async () => {
    try {
      const options = {
        quality: 0.8,
        base64: true,
        width: 1000,
        doNotSave: true,
        orientation: "portrait",
        fixOrientation: true,
        pauseAfterCapture: true,
      };
      
      const image = await cameraRef.current.takePictureAsync(options);
      setPhoto("data:image/jpg;base64," + image.base64);
    } catch (error) {
      console.log(error);
    }
  }

  const onCancelCapture = () => {
    setPhoto(null);
    cameraRef.current.resumePreview();
  }

  const onSaveCapture = async () => {
    navigation.navigate({
      name: 'checkPatrol',
      params: {media: photo},
      merge: true
    });
  }

  return (
    <View style={styles.container}>
      {useIsFocused() && (
        <RNCamera
          zoom={zoom}
          ref={cameraRef}
          style={{flex: 1}}
          type={!switchCamera ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
          flashMode={!flash ? RNCamera.Constants.FlashMode.off : RNCamera.Constants.FlashMode.on}
          captureAudio={false}
          pauseAfterCapture={false}>
          <View style={styles.topControlContainer}>
            <Icon.ArrowLeft size={20} fillColor='none' strokeColor='#FFFFFF' onPress={() => onGoBackHandler()} />
            {!flash ? (
              <Icon.FlashOff size={20} fillColor='none' strokeColor='#FFFFFF' onPress={() => setFlash(prevState => !prevState) } />
            ) : (
              <Icon.Flash size={20} fillColor='none' strokeColor='#FFFFFF' onPress={() => setFlash(prevState => !prevState) } />
            )}
          </View>
          <ZoomView
            onZoomProgress={progress => {
              setZoom(progress);
            }}
            onZoomStart={() => {
              console.log('zoom start');
            }}
            onZoomEnd={() => {
              console.log('zoom end');
            }}>
              <View style={styles.cameraArea} />
          </ZoomView>
            <View style={styles.bottomControlContainer}>
            {!photo ? (
              <>
                <Icon.ImageDirectory size={25} fillColor='none' strokeColor='#FFFFFF' onPress={() => setFlash(prevState => !prevState) } />
                <Icon.CircleCapture size={65} fillColor='#FFFFFF' strokeColor='#FFFFFF' onPress={onCapture} />
                <Icon.SwitchCamera size={25} fillColor='none' strokeColor='#FFFFFF' onPress={() => setSwitchCamera(prevState => !prevState)} />
              </>
            ) : (
              <>
                <Icon.CrossCircle size={35} fillColor='none' strokeColor='#FFFFFF' onPress={onCancelCapture} />
                <Icon.CheckCircle size={35} fillColor='none' strokeColor='#FFFFFF' onPress={onSaveCapture} />
              </>
            )}
            </View>
        </RNCamera>
      )}
    </View>
  )
}

const ZoomView = (props) => {
  const panResponder = useRef(
    PanResponder.create({
      onPanResponderMove: (e, { dy }) => {
        const { height: windowHeight } = Dimensions.get('window');
        return props.onZoomProgress(Math.min(Math.max((dy * -1) / windowHeight, 0), 0.5));
      },
      onMoveShouldSetPanResponder: (ev, { dx }) => {
        return dx !== 0;
      },
      onPanResponderGrant: () => {
        return props.onZoomStart();
      },
      onPanResponderRelease: () => {
        return props.onZoomEnd();
      },
    })
  ).current;

  return (
    <View style={{ flex: 1, width: '100%' }} {...panResponder.panHandlers}>
      {props.children}
    </View>
  );
}

export default CheckPatrolCamera

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  }, 
  cameraArea: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  topControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 50,
    backgroundColor: '#000000'
  },
  bottomControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    height: 150,
    backgroundColor: '#000000'
  },
})