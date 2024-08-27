import { StyleSheet, View } from 'react-native'
import React, {useRef, useState} from 'react'
import { RNCamera } from 'react-native-camera'
import { useIsFocused } from '@react-navigation/native'
import { Icon } from '@themes'
import { unlink } from 'react-native-fs'

const CheckPatrolCamera = ({navigation}) => {
  const cameraRef = useRef();
  const [photo, setPhoto] = useState(null);
  const [flash, setFlash] = useState(false);
  const [switchCamera, setSwitchCamera] = useState(false);

  const onCapture = async () => {
    try {
      const options = {
        quality: 0.5,
        base64: true,
        // orientation: "portrait",
        pauseAfterCapture: true,
        // fixOrientation: true
      };
      
      const image = await cameraRef.current.takePictureAsync(options);
      setPhoto("data:image/jpg;base64," + image.base64);
      unlink(image.uri);
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
          ref={cameraRef}
          style={styles.preview}
          type={!switchCamera ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
          flashMode={!flash ? RNCamera.Constants.FlashMode.off : RNCamera.Constants.FlashMode.on}
          captureAudio={false}
          pauseAfterCapture={false}>
            {!photo ? (
              <View style={styles.controlContainer}>
                {!flash ? (
                  <Icon.FlashOff size={30} fillColor='none' strokeColor='#FFFFFF' onPress={() => setFlash(prevState => !prevState) } />
                ) : (
                  <Icon.Flash size={30} fillColor='none' strokeColor='#FFFFFF' onPress={() => setFlash(prevState => !prevState) } />
                )}
                <Icon.CircleCapture size={65} fillColor='#FFFFFF' strokeColor='#FFFFFF' onPress={onCapture} />
                <Icon.SwitchCamera size={30} fillColor='none' strokeColor='#FFFFFF' onPress={() => setSwitchCamera(prevState => !prevState)} />
              </View>
            ) : (
              <View style={styles.controlContainer}>
                <Icon.CrossCircle size={35} fillColor='none' strokeColor='#FFFFFF' onPress={onCancelCapture} />
                <Icon.CheckCircle size={35} fillColor='none' strokeColor='#FFFFFF' onPress={onSaveCapture} />
              </View>
            )}
        </RNCamera>
      )}
    </View>
  )
}

export default CheckPatrolCamera

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  }, 
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  controlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 50,
    // backgroundColor: '#000000'
  },
})