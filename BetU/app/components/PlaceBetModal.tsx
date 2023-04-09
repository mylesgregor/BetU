// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import Slider from 'react-native-slider';
// import Switch from 'react-native-switch'; 
// import { Toggle } from './Toggle';
// export function PlaceBetModal() {
//   const [moneyValue, setMoneyValue] = useState(0);
//   const [toggle, setToggle] = useState(false);

//   const handleSliderChange = (value) => {
//     setMoneyValue(value);
//   };

//   const handleToggleChange = (value) => {
//     setToggle(value);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Money Slider</Text>
//       <Slider
//         style={styles.slider}
//         minimumValue={0}
//         maximumValue={1000}
//         value={moneyValue}
//         onValueChange={handleSliderChange}
//         step={0.01}
//       />
//       <Text style={styles.value}>{`$${moneyValue.toFixed(2)}`}</Text>
//       <View style={styles.switchContainer}>
//       <View >
//                   <Toggle
//                     value={toggle}
//                     // onValueChange={() =>
//                     //   episodeStore.setProp("favoritesOnly", !episodeStore.favoritesOnly)
//                     // }
//                     variant="switch"
//                     labelTx="viewEventsScreen.onlyFavorites"
//                     labelPosition="left"
//                     // labelStyle={$labelStyle}
//                     // accessibilityLabel={translate("viewEventsScreen.accessibility.switch")}
//                   />
//                 </View>
//       </View>
//     </View>
//   )
// }
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: 16,
//     },
//     title: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       marginBottom: 16,
//     },
//     slider: {
//       width: '100%',
//       marginBottom: 16,
//     },
//     value: {
//       fontSize: 18,
//       marginBottom: 16,
//     },
//     switchContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
//     switchLabel: {
//       fontSize: 18,
//       marginRight: 8,
//     },
//   });
  

