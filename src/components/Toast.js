import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text, View} from 'react-native';

const Message = props => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      props.onHide();
    });
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -20],
            }),
          },
          {
            scaleX: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1],
            }),
          },
          {
            scaleY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1],
            }),
          },
        ],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginBottom: 5,
        backgroundColor: "#000000",
        padding: 15,
        borderRadius: 50,
        // shadowColor: 'black',
        // shadowOffset: {
        //   width: 0,
        //   height: 3,
        // },
        // shadowOpacity: 0.15,
        // shadowRadius: 5,
        // elevation: 6,
      }}>
      <Text style={{color: "#FFFFFF", textAlign: 'center'}}>{props.message}</Text>
    </Animated.View>
  );
};

const Toast = ({messages}) => {
    const [toastMessage, setToastMessage] = useState([]);

    useEffect(() => {
      setToastMessage(prevState => [...prevState, messages]);

      return () => setToastMessage([]);
    }, [messages]);

    const hideToast = (message) => {
      setToastMessage(prevMessages => prevMessages.filter(msg => msg !== message));
    }

    return (
        <>
            <View
                style={{
                position: 'absolute',
                bottom: 5,
                left: 0,
                right: 0,
                zIndex: 2,
                }}>
                {toastMessage.map((message, i) => (
                <Message
                    key={i}
                    message={message}
                    onHide={() => hideToast(message)}
                />
                ))}
            </View>
        </>
    );
};

export default Toast;
