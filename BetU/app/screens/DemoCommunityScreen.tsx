// Interested in migrating from FlatList to FlashList? Check out the recipe in our Ignite Cookbook
// https://ignitecookbook.com/docs/recipes/MigratingToFlashList
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo } from "react"
// import Slider from 'react-native-slider';
import Switch from 'react-native-switch'; 
import {
  AccessibilityProps,
  ActivityIndicator,
  FlatList,
  Image,
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  Modal,
  Alert,
  Pressable,
  TextInput
} from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { Button, Card, EmptyState, Icon, Screen, Text, Toggle, ToggleProps } from "../components"
import { isRTL, translate } from "../i18n"
import { useStores } from "../models"
import { Episode } from "../models/Episode"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"
import { delay } from "../utils/delay"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"
import axios from 'axios'

const ICON_SIZE = 14

const rnrImage1 = require("../../assets/images/rnr-image-1.png")
const rnrImage2 = require("../../assets/images/rnr-image-2.png")
const rnrImage3 = require("../../assets/images/rnr-image-3.png")
const rnrImages = [rnrImage1, rnrImage2, rnrImage3]


export const DemoCommunityScreen: FC<DemoTabScreenProps<"DemoPodcastList">> = observer(
  function DemoCommunityScreen(_props) {
    const { episodeStore } = useStores()

    const [refreshing, setRefreshing] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    // initially, kick off a background refresh without the refreshing UI
    useEffect(() => {
      ;(async function load() {
        setIsLoading(true)
        await episodeStore.fetchEpisodes()
        setIsLoading(false)
      })()
    }, [episodeStore])

    // simulate a longer refresh, if the refresh is too fast for UX
    async function manualRefresh() {
      setRefreshing(true)
      await Promise.all([episodeStore.fetchEpisodes(), delay(750)])
      setRefreshing(false)
    }

   const [jData, setData] = React.useState([{
        "id": 1,
        "betname": "Bryan can squat 600lbs",
        "money": 439,
        "win": "",
  },]);
    async function fetchData() {
      try {
        const response = await axios.get('https://retoolapi.dev/GCbmva/newdata');

       setData(response.data);
      } catch (error) {
        //('Error fetching data:', error);
        //Do nothing
      }
    }

    fetchData();
    // console.log("TEST", jData[1].name);

    // var cards = [];

    // for(let i = 0; i < 3; i++){
      
    //   cards.push(
    //     <Card
    //           style={$item}
    //           verticalAlignment="force-footer-bottom"
    //           // onPress={handlePressCard}
    //           // onPress={() => setModalVisible(true)}
    //           // onLongPress={handlePressFavorite}
    //           HeadingComponent={
    //             <View style={$metadata}>
    //               <Text
    //                 style={$metadataText}
    //                 size="xxs"
    //                 // accessibilityLabel={episode.datePublished.accessibilityLabel}
    //               >
    //                 {jData[i].name}
    //               </Text>
    //               {/* <Text
    //                 style={$metadataText}
    //                 size="xxs"
    //                 // accessibilityLabel={episode.duration.accessibilityLabel}
    //               >
    //                 {episode.duration.textLabel}
    //               </Text> */}
    //             </View>
    //           }

    //           RightComponent={
    //           <Text>
    //             ${jData[i].money}
    //           </Text>
    //         }
        
    //           FooterComponent={
    //             <View style={$overUnderView}>
    //             <Text style={$cardOverText}>{jData[i].over}</Text> 
    //             <Text>/</Text>
    //             <Text style={$cardUnderText}>{jData[i].under}</Text> 
    //             </View>
    //           }
    //         />
    //   )
    // }
    


    return (
      // <>

      // <Screen
      //   preset="fixed"
      //   safeAreaEdges={["top"]}
      //   contentContainerStyle={$screenContentContainer}
      // >     

    
      //   {cards}
       
      // </Screen>
      // </>
      <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={$screenContentContainer}
    >
      <FlatList<any>
        data={jData}
        extraData={episodeStore.favorites.length + episodeStore.episodes.length}
        contentContainerStyle={$flatListContentContainer}
        refreshing={refreshing}
        onRefresh={manualRefresh}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              style={$emptyState}
              headingTx={
                episodeStore.favoritesOnly
                  ? "viewEventsScreen.noFavoritesEmptyState.heading"
                  : undefined
              }
              contentTx={
                episodeStore.favoritesOnly
                  ? "viewEventsScreen.noFavoritesEmptyState.content"
                  : undefined
              }
              button={episodeStore.favoritesOnly ? null : undefined}
              buttonOnPress={manualRefresh}
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        ListHeaderComponent={
          <View style={$heading}>
            <Text preset="heading" tx="demo.title" />
            {(episodeStore.favoritesOnly || episodeStore.episodesForList.length > 0) && (
              <View style={$toggle}>
                {/* <Toggle
                  value={episodeStore.favoritesOnly}
                  onValueChange={() =>
                    episodeStore.setProp("favoritesOnly", !episodeStore.favoritesOnly)
                  }
                  variant="switch"
                  labelTx="viewEventsScreen.onlyFavorites"
                  labelPosition="left"
                  labelStyle={$labelStyle}
                  accessibilityLabel={translate("viewEventsScreen.accessibility.switch")}
                /> */}
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <EpisodeCard
            key={item.guid}
            episode={item}
            isFavorite={episodeStore.hasFavorite(item)}
            onPressFavorite={() => episodeStore.toggleFavorite(item)}
          />
        )}
      />
    </Screen>
    )
  },
)

const EpisodeCard = observer(function EpisodeCard({
  episode,
  isFavorite,
  onPressFavorite,
  onPress,
}: {
  episode: Episode
  onPressFavorite: () => void
  isFavorite: boolean
  onPress: () => void
}) {
  const liked = useSharedValue(isFavorite ? 1 : 0)

  const imageUri = useMemo(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

  // Grey heart
  const animatedLikeButtonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.EXTEND),
        },
      ],
      opacity: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
    }
  })

  // Pink heart
  const animatedUnlikeButtonStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: liked.value,
        },
      ],
      opacity: liked.value,
    }
  })

  /**
   * Android has a "longpress" accessibility action. iOS does not, so we just have to use a hint.
   * @see https://reactnative.dev/docs/accessibility#accessibilityactions
   */
  const accessibilityHintProps = useMemo(
    () =>
      Platform.select<AccessibilityProps>({
        ios: {
          accessibilityLabel: episode.title,
          accessibilityHint: translate("viewEventsScreen.accessibility.cardHint", {
            action: isFavorite ? "unfavorite" : "favorite",
          }),
        },
        android: {
          accessibilityLabel: episode.title,
          accessibilityActions: [
            {
              name: "longpress",
              label: translate("viewEventsScreen.accessibility.favoriteAction"),
            },
          ],
          onAccessibilityAction: ({ nativeEvent }) => {
            if (nativeEvent.actionName === "longpress") {
              handlePressFavorite()
            }
          },
        },
      }),
    [episode, isFavorite],
  )

  const handlePressFavorite = () => {
    onPressFavorite()
    liked.value = withSpring(liked.value ? 0 : 1)
  }

  const handlePressCard = () => {
    openLinkInBrowser(episode.enclosure.link)
  }

  // const ButtonLeftAccessory = useMemo(
  //   () =>
  //     function ButtonLeftAccessory() {
  //       return (
  //         <View>
  //           <Animated.View
  //             style={[$iconContainer, StyleSheet.absoluteFill, animatedLikeButtonStyles]}
  //           >
  //             <Icon
  //               icon="heart"
  //               size={ICON_SIZE}
  //               color={colors.palette.neutral800} // dark grey
  //             />
  //           </Animated.View>
  //           <Animated.View style={[$iconContainer, animatedUnlikeButtonStyles]}>
  //             <Icon
  //               icon="heart"
  //               size={ICON_SIZE}
  //               color={colors.palette.primary400} // pink
  //             />
  //           </Animated.View>
  //         </View>
  //       )
  //     },
  //   [],
  // )
  const [modalVisible, setModalVisible] = React.useState(false);
  const [moneyValue, setMoneyValue] = React.useState(0);
  const [toggle, setToggle] = React.useState(false);

  const handleSliderChange = (value) => {
    setMoneyValue(value);
  };

  const handleToggleChange = (value) => {
    setToggle(value);
  };

  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState("10");
  const [idGen, setidGen] = React.useState(15);
 

  // function placeBet(b:any, a:any){
  //   setModalVisible(!modalVisible);
  //   function runner(){
  //     setidGen(idGen + 1);
  //     const data = {
  //       "id": idGen,
  //       "name": a,
  //       "money": number,
  //       "win": "1",
  //     };
      
  //     axios.post('https://retoolapi.dev/SeRCzG/newdata', data)
  //     .then(response => {
  //       console.log('Response:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  //   }
  // }
  return (
    <>

    <Card
      style={$item}
      verticalAlignment="force-footer-bottom"
      // onPress={handlePressCard}
      onPress={() => setModalVisible(true)}
      // onLongPress={handlePressFavorite}
      HeadingComponent={
        <View style={$metadata}>
          <Text
            style={$metadataText}
            size="xxs"
            // accessibilityLabel={episode.datePublished.accessibilityLabel}
          >
            {episode.date}
          </Text>
          {/* <Text
            style={$metadataText}
            size="xxs"
            // accessibilityLabel={episode.duration.accessibilityLabel}
          >
            {episode.name}
          </Text> */}
        </View>
      }
      content={`${episode.betname}`}
      // {...accessibilityHintProps}
      RightComponent={
      // <Image source={imageUri} style={$itemThumbnail} />
      <Text>
        ${episode.money}
      </Text>
    }

      FooterComponent={
        <View style={$overUnderView}>
        <Text style={$cardOverText}>{episode.win}</Text> 

        </View>
        // <Button
        //   onPress={handlePressFavorite}
        //   onLongPress={handlePressFavorite}
        //   style={[$favoriteButton, isFavorite && $unFavoriteButton]}
        //   // accessibilityLabel={
        //   //   isFavorite
        //   //     ? translate("demoPodcastListScreen.accessibility.unfavoriteIcon")
        //   //     : translate("demoPodcastListScreen.accessibility.favoriteIcon")
        //   // }
        //   // LeftAccessory={ButtonLeftAccessory}
        // >
        //   <Text
        //     size="xxs"
        //     // accessibilityLabel={episode.duration.accessibilityLabel}
        //     weight="medium"
        //     text={
        //       isFavorite
        //         ? translate("demoPodcastListScreen.unfavoriteButton")
        //         : translate("demoPodcastListScreen.favoriteButton")
        //     }
        //   />
        // </Button>
      }
    />
    </>
  )
})

// #region Styles
const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.large,
  paddingTop: spacing.large + spacing.extraLarge,
  paddingBottom: spacing.large,
}

const $heading: ViewStyle = {
  marginBottom: spacing.medium,
}


const $item: ViewStyle = {
  padding: spacing.medium,
  marginTop: spacing.medium,
  minHeight: 120,
}

const $itemThumbnail: ImageStyle = {
  marginTop: spacing.small,
  borderRadius: 50,
  alignSelf: "flex-start",
}

const $toggle: ViewStyle = {
  marginTop: spacing.medium,
}

const $labelStyle: TextStyle = {
  textAlign: "left",
}

const $iconContainer: ViewStyle = {
  height: ICON_SIZE,
  width: ICON_SIZE,
  flexDirection: "row",
  marginEnd: spacing.small,
}

const $metadata: TextStyle = {
  color: colors.textDim,
  marginTop: spacing.extraSmall,
  flexDirection: "row",
}

const $metadataText: TextStyle = {
  color: colors.textDim,
  marginEnd: spacing.medium,
  marginBottom: spacing.extraSmall,
}

const $cardOverText: TextStyle = {
  color: colors.green,
  marginEnd: spacing.extraSmall,
  marginBottom: spacing.extraSmall,
}
const $cardUnderText: TextStyle = {
  color: colors.materialRed,
  marginStart: spacing.extraSmall,
  marginBottom: spacing.extraSmall,
}

const $favoriteButton: ViewStyle = {
  borderRadius: 17,
  marginTop: spacing.medium,
  justifyContent: "flex-start",
  backgroundColor: colors.palette.neutral300,
  borderColor: colors.palette.neutral300,
  paddingHorizontal: spacing.medium,
  paddingTop: spacing.micro,
  paddingBottom: 0,
  minHeight: 32,
  alignSelf: "flex-start",
}

const $overUnderView: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'left',
  justifyContent: 'left',
}

const $unFavoriteButton: ViewStyle = {
  borderColor: colors.palette.primary100,
  backgroundColor: colors.palette.primary100,
}

const $emptyState: ViewStyle = {
  marginTop: spacing.huge,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    paddingBottom: 15,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10
    // paddingEnd: 10
  },
  container23: {
    margin: 10,
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
  },  buttonGreen: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#4CAF50',
  },
  buttonRed: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#F44336',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    marginBottom: 16,
  },
  value: {
    fontSize: 18,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 18,
    marginRight: 8,
  },  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});




// #endregion

// @demo remove-file
