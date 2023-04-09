// Interested in migrating from FlatList to FlashList? Check out the recipe in our Ignite Cookbook
// https://ignitecookbook.com/docs/recipes/MigratingToFlashList
import { getMaxMemoryAsync } from "expo-device"
import { observer } from "mobx-react-lite"
import { resetGlobalState } from "mobx/dist/internal"
import React, { FC, useEffect, useMemo } from "react"
import axios from "axios"
import AppState from "react-native"
import {
  AccessibilityProps,
  ActivityIndicator,
  FlatList,
  Image,
  ImageStyle,
  Platform,
  Pressable,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { Button, Card, EmptyState, Icon, Screen, Text, Toggle } from "../components"
import { isRTL, translate } from "../i18n"
import { useStores } from "../models"
import { Episode } from "../models/Episode"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"
import { delay } from "../utils/delay"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"
import { check } from "prettier"
import { string } from "mobx-state-tree/dist/internal"

const ICON_SIZE = 14

const rnrImage1 = require("../../assets/images/rnr-image-1.png")
const rnrImage2 = require("../../assets/images/rnr-image-2.png")
const rnrImage3 = require("../../assets/images/rnr-image-3.png")
const rnrImages = [rnrImage1, rnrImage2, rnrImage3]

type Movie = {
  id: string;
  title: string;
  releaseYear: string;
};

export const SelectOutcomeScreen: FC<DemoTabScreenProps<"DemoPodcastList">> = observer(
  
  function SelectOutcomeScreen(_props) {

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
      "date": "Apr 16, 2023 3:11 AM",
      "name": "Bryan can squat 600lbs",
      "over": 45,
      "money": 439,
      "under": 2,
      "creator": "Tom Davidi"
    },
]);
  async function fetchData() {
    try {
      const response = await axios.get('https://retoolapi.dev/awUUMv/data?creator=Fawne%20Lauks');

     setData(response.data);
    } catch (error) {
      //console.error('Error fetching data:', error);
      //Do nothing
    }
  }

  fetchData();

    return (
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
                    ? "selectOutcomeScreen.noFavoritesEmptyState.heading"
                    : undefined
                }
                contentTx={
                  episodeStore.favoritesOnly
                    ? "selectOutcomeScreen.noFavoritesEmptyState.content"
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
              <Text preset="heading" tx="selectOutcomeScreen.title" />
              {(episodeStore.favoritesOnly || episodeStore.episodesForList.length > 0) && (
                <View style={$toggle}>
                  <Toggle
                    value={episodeStore.favoritesOnly}
                    onValueChange={() =>
                      episodeStore.setProp("favoritesOnly", !episodeStore.favoritesOnly)
                    }
                    variant="switch"
                    labelTx="selectOutcomeScreen.onlyFavorites"
                    labelPosition="left"
                    labelStyle={$labelStyle}
                    accessibilityLabel={translate("selectOutcomeScreen.accessibility.switch")}
                  />
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
}: {
  episode: Episode
  onPressFavorite: () => void
  isFavorite: boolean
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
          accessibilityHint: translate("selectOutcomeScreen.accessibility.cardHint", {
            action: isFavorite ? "unfavorite" : "favorite",
          }),
        },
        android: {
          accessibilityLabel: episode.title,
          accessibilityActions: [
            {
              name: "longpress",
              label: translate("selectOutcomeScreen.accessibility.favoriteAction"),
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
    // openLinkInBrowser(episode.enclosure.link)
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
  const title = 'Save';
  const [temp, setTemp] = React.useState('')
  
  // async function fetchData() {
  //   try {
  //     const response = await axios.get('https://retoolapi.dev/awUUMv/data?creator=Fawne%20Lauks');
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }
  
  // fetchData();
  // var getMoviesFromApiAsync = async () => {
  //   try {
  //     const response = await fetch(
  //       'http://127.0.0.1:8000/betUniversity/users',{method:"GET"},
  //     );
  //     const json = await response.json();
  //     console.log(json.first_name)
  //     setTemp(json.first_name)
      
  //     return json.description;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // getMoviesFromApiAsync();

  function checkDate(date: any){
    // Create a new Date object for the current date
    const currentDate = new Date();

    // Create a new Date object for the specific date to compare to
    const specificDate = new Date(date);
    console.log(date)
    console.log(currentDate.getTime(), specificDate.getTime())

    // Compare the timestamps of the two dates
    if (currentDate.getTime() > specificDate.getTime()) {
        return false;
    } else if (currentDate.getTime() < specificDate.getTime()) {
      return true;
    } else {
      return false;
    }

  }

  return (
    
    <Card
      style={$item}
      verticalAlignment="force-footer-bottom"
      onPress={handlePressCard}
   
      HeadingComponent={
        <View style={$metadata}>
          <Text
            style={$metadataText}
            size="xxs"
            // accessibilityLabel={episode.datePublished.accessibilityLabel}
          >
            {episode.date}
          </Text>
        
        </View>
      }
      content={`${episode.name}`}
      {...accessibilityHintProps}
      RightComponent={
    
      <Text>
        ${episode.money}
      </Text>
    }
    

      FooterComponent={
        <View style={$overUnderView}>
          {/* <TouchableOpacity > */}
          <Pressable style={styles.buttonGreen}  onPress={() => console.log('Button pressed!')}>
            <Text style={styles.text}>Yes</Text>
          </Pressable>
          {/* </TouchableOpacity> */}
        
        <Text>
        {"\u00A0"}
        </Text>
        
        <Pressable style={styles.buttonRed}  onPress={() => console.log('Button pressed!')}>
            <Text style={styles.text}>No</Text>
          </Pressable>
          
        </View>
        
      }
    />
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
  color: '#F03C2F',
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
  justifyContent: 'flex-end',
  flex: 1
  
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
  buttonGreen: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#B2C4A7',
  },
  buttonRed: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#F7BFBB',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

function handleAppStateChange(arg0: string, handleAppStateChange: any) {
  throw new Error("Function not implemented.")
}
// const styles = StyleSheet.create({
//   button: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 10,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: 'black',
    
//     height: 20 
  
//   },
//   text: {
//     fontSize: 16,
//     lineHeight: 21,
//     fontWeight: 'bold',
//     letterSpacing: 0.25,
//     color: 'white',
//   },
// });
// #endregion

// @demo remove-file
