// import React, { FC, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle , Button as TradButton} from "react-native"
import { Button, Icon, ListItem, Screen, Text, TextField } from "../components"
//import {Button} from 'react-native'
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing } from "../theme"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"
import { isRTL } from "../i18n"
import DatePicker from 'react-native-modern-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {FC, } from "react"
import {Alert, Modal, StyleSheet, Pressable, TextInput} from 'react-native';
import { Platform } from "expo-modules-core"
import { DemoUseCase } from "./DemoShowroomScreen/DemoUseCase"
import axios from "axios"

const chainReactLogo = require("../../assets/images/cr-logo.png")
const reactNativeLiveLogo = require("../../assets/images/rnl-logo.png")
const reactNativeRadioLogo = require("../../assets/images/rnr-logo.png")
const reactNativeNewsletterLogo = require("../../assets/images/rnn-logo.png")
// const [date, setDate] = React.useState(new Date())
// const [open, setOpen] = React.useState(false)

export const NewEventScreen: FC<DemoTabScreenProps<"DemoNew">> =
  function NewEventScreen(_props) {


    
    const dateObject = new Date();
  
    const [selectedDate, setSelectedDate] = React.useState( dateObject.toLocaleString());
    const [modalVisible, setModalVisible] = React.useState(false);
    const $iconStyle: ImageStyle = { width: 30, height: 30 }
    const [text, onChangeText] = React.useState('');
    const [idGen, setidGen] = React.useState(15);

  
    
    function runner(){
      setidGen(idGen + 1);
      const data = {
        "id": idGen,
        "date": selectedDate,
        "name": text,
        "over": 0,
        "money": 0,
        "under": 0,
        "creator": "Fawne Lauks"
      };
      
      axios.post('https://retoolapi.dev/awUUMv/data', data)
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
   



    return (

      
      <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
        
        <Text preset="heading" tx="newEventScreen.title" style={$title} />
        
        <DemoUseCase
        name="New Event Name:"
        description="Set your event name and end Date/Time!">
        <View
      style={{
        
        borderBottomColor: '#808080',
        borderWidth: 1,
        
      }}>
        

      
      <TextInput
        editable
        multiline={true}
        numberOfLines={4}
        maxLength={40}
        
       
        onChangeText={text => onChangeText(text)}
        value={text}
        placeholder={"Event Name..."}
        style={{padding: 10}}
      />
       
    </View>

   
   
    
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
      
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          
          <View style={styles.modalView}>
          <DatePicker
          //  minimumDate={dateObject.toLocaleDateString()}
          
      onSelectedChange={date => setSelectedDate(date)}
    />
    
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Select End Date and Time</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end"
        }}>
      

      <Button
        preset="filled"
        onPress={() => setModalVisible(true)}
        RightAccessory={(props) => (
          <Icon containerStyle={props.style} style={$iconStyle} icon="settings" />
        )}
      >
        {selectedDate}
      </Button>
      
      </View>
     
    </View>
    </DemoUseCase>
   
    
  
      
    
  

       <Button text="Create!!" onPress={runner}/>

        {/* <ListItem
          tx="newEventScreen.joinSlackLink"
          leftIcon="slack"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          // onPress={() => openLinkInBrowser("https://community.infinite.red/")}
        />
        <Text
          preset="subheading"
          tx="newEventScreen.makeIgniteEvenBetterTitle"
          style={$sectionTitle}
        />
        <Text tx="newEventScreen.makeIgniteEvenBetter" style={$description} />
        <ListItem
          tx="newEventScreen.contributeToIgniteLink"
          leftIcon="github"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          // onPress={() => openLinkInBrowser("https://github.com/infinitered/ignite")}
        />

        <Text
          preset="subheading"
          tx="newEventScreen.theLatestInReactNativeTitle"
          style={$sectionTitle}
        />
        <Text tx="newEventScreen.theLatestInReactNative" style={$description} />
        <ListItem
          tx="newEventScreen.reactNativeRadioLink"
          bottomSeparator
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={$logoContainer}>
              <Image source={reactNativeRadioLogo} style={$logo} />
            </View>
          }
          // onPress={() => openLinkInBrowser("https://reactnativeradio.com/")}
        />
        <ListItem
          tx="newEventScreen.reactNativeNewsletterLink"
          bottomSeparator
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={$logoContainer}>
              <Image source={reactNativeNewsletterLogo} style={$logo} />
            </View>
          }
          // onPress={() => openLinkInBrowser("https://reactnativenewsletter.com/")}
        />
        <ListItem
          tx="newEventScreen.reactNativeLiveLink"
          bottomSeparator
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={$logoContainer}>
              <Image source={reactNativeLiveLogo} style={$logo} />
            </View>
          }
          // onPress={() => openLinkInBrowser("https://rn.live/")}
        />
        <ListItem
          tx="newEventScreen.chainReactConferenceLink"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={$logoContainer}>
              <Image source={chainReactLogo} style={$logo} />
            </View>
          }
          // onPress={() => openLinkInBrowser("https://cr.infinite.red/")}
        />
        <Text preset="subheading" tx="newEventScreen.hireUsTitle" style={$sectionTitle} />
        <Text tx="newEventScreen.hireUs" style={$description} />
        <ListItem
          tx="demoCommunityScreen.hireUsLink"
          leftIcon="clap"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          // onPress={() => openLinkInBrowser("https://infinite.red/contact")}
        /> */}
      </Screen>
    )
  }
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      
      height: 400,
      width: 300,
      margin: .5,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 5,
      
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
const $container: ViewStyle = {
  paddingTop: spacing.large + spacing.extraLarge,
  paddingHorizontal: spacing.large,
}

const $title: TextStyle = {
  marginBottom: spacing.small,
}

const $tagline: TextStyle = {
  marginBottom: spacing.huge,
}

const $description: TextStyle = {
  marginBottom: spacing.large,
}

const $sectionTitle: TextStyle = {
  marginTop: spacing.huge,
}

const $logoContainer: ViewStyle = {
  marginEnd: spacing.medium,
  flexDirection: "row",
  flexWrap: "wrap",
  alignContent: "center",
}

const $logo: ImageStyle = {
  height: 38,
  width: 38,
}

// @demo remove-file
