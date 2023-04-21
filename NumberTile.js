import React, { useMemo } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    Animated,
  } from "react-native";
  
const NumberTile = ({ handleClick, number }) => {
    let animatedValue = new Animated.Value(0);
    let currentValue = 0;
    const generateRandomColor = () => {
        return `#${Math.floor(Math.random()*16777215).toString(16)}`;
    }
    const color = useMemo(() => generateRandomColor(), []);

    animatedValue.addListener(({ value }) => {
    currentValue = value;
    });
    const flipToBack = () => {
          Animated.timing(animatedValue, {
            duration:400,
              toValue: 180,
              useNativeDriver: false,
            }).start();
      };

      const handleItemClick = (number) => {
        flipToBack();
        setTimeout(()=>{
            handleClick(number)
        },400)
      }

      const setInterpolate = animatedValue.interpolate({
        inputRange: [180, 360],
        outputRange: ['180deg', '360deg'],
      });
    
      const rotateYAnimatedStyle = {
        transform: [{ rotateY: setInterpolate }],
      };
    return (
        <Animated.View style={[styles.cardContainer, rotateYAnimatedStyle, {backgroundColor: color}]} >
        <Pressable onPress={()=>handleItemClick(number)} style={styles.card}>
            <Text style={styles.numberStyle}>{number}</Text>
        </Pressable>
        </Animated.View>
      );
}

const styles=StyleSheet.create({
    cardContainer:{
        height: 80,
        width: 80,
        margin:20,
    },
    card:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    numberStyle:{
        color:'white', fontSize:18, fontWeight:700
    }
})

export default React.memo(NumberTile);