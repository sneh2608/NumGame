import { SafeAreaView, StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { numberArray } from './constants';
import NumberTile from './NumberTile';
import { useCallback, useState } from 'react';

export default function App() {
  const [numbers, setNumbers] = useState(numberArray);
    const handleClick= useCallback((item)=>{
      const index = numbers.findIndex((num)=>num === item);
       const tempArr =  [...numbers.slice(0,index),...numbers.slice(index+1,numbers.length)]
       setNumbers(tempArr);
    },[numbers])

    return (
      <SafeAreaView>
      <View style={styles.container}>
        {numbers.map((number) => {
          return (
            <NumberTile handleClick={handleClick} number={number} key={number}/>
          );
        })}
      </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    flexWrap:'wrap',
    marginTop: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});
