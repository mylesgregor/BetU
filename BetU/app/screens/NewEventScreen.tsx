// import React, { FC, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Button, ListItem, Screen, Text, TextField } from "../components"
//import {Button} from 'react-native'
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing } from "../theme"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"
import { isRTL } from "../i18n"
import DatePicker from 'react-native-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react"
import { Platform } from "expo-modules-core"

const chainReactLogo = require("../../assets/images/cr-logo.png")
const reactNativeLiveLogo = require("../../assets/images/rnl-logo.png")
const reactNativeRadioLogo = require("../../assets/images/rnr-logo.png")
const reactNativeNewsletterLogo = require("../../assets/images/rnn-logo.png")
// const [date, setDate] = useState(new Date())
// const [open, setOpen] = useState(false)
const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
export const NewEventScreen: FC<DemoTabScreenProps<"NewEvent">> =
  function NewEventScreen(_props) {
    return (
      <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
        <Text preset="heading" tx="newEventScreen.title" style={$title} />
        <Text tx="newEventScreen.tagLine" style={$tagline} />

        
        <TextField
        label=""
        value=""
        placeholder="Lorem Ipsum..."
        multiline
      />


  
    
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    

   

  
    
      {/* <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      /> */}
    
  

       <Button text="Create!!" />

        <ListItem
          tx="newEventScreen.joinSlackLink"
          leftIcon="slack"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={() => openLinkInBrowser("https://community.infinite.red/")}
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
          onPress={() => openLinkInBrowser("https://github.com/infinitered/ignite")}
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
          onPress={() => openLinkInBrowser("https://reactnativeradio.com/")}
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
          onPress={() => openLinkInBrowser("https://reactnativenewsletter.com/")}
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
          onPress={() => openLinkInBrowser("https://rn.live/")}
        />
        <ListItem
          tx="newEventScreen.chainReactConferenceLink"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          LeftComponent={
            <View style={$logoContainer}>
              <Image source={chainReactLogo} style={$logo} />
            </View>
          }
          onPress={() => openLinkInBrowser("https://cr.infinite.red/")}
        />
        <Text preset="subheading" tx="newEventScreen.hireUsTitle" style={$sectionTitle} />
        <Text tx="newEventScreen.hireUs" style={$description} />
        <ListItem
          tx="demoCommunityScreen.hireUsLink"
          leftIcon="clap"
          rightIcon={isRTL ? "caretLeft" : "caretRight"}
          onPress={() => openLinkInBrowser("https://infinite.red/contact")}
        />
      </Screen>
    )
  }

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
