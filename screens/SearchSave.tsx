import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import Logo from "../assets/logo.svg";
import Logo1 from "../assets/logo1.svg";
import Battery from "../assets/battery.svg";
import Wifi from "../assets/wifi.svg";
import Mobilesignal from "../assets/mobile-signal.svg";
import Group3 from "../assets/group3.svg";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const SearchSave = () => {
  return (
    <View style={styles.searchSave}>
      <Logo
        style={[styles.logoIcon, styles.logoIconLayout]}
        width={6}
        height={3}
      />
      <Logo1
        style={[styles.logoIcon1, styles.logoIconLayout]}
        width={6}
        height={3}
      />
      <Text style={styles.learnMoreAboutContainer}>
        {`Learn more about `}
        <Text style={styles.weatherData}>weather data</Text>
        {` and `}
        <Text style={styles.weatherData}>map data</Text>
      </Text>
      <View style={styles.list}>
        <View style={[styles.group, styles.groupPosition]}>
          <Image
            style={[styles.groupIcon, styles.groupPosition]}
            contentFit="cover"
            source={require("../assets/group.png")}
          />
          <Text style={[styles.l15, styles.l15Typo]}>L:15°</Text>
          <Text style={[styles.h29, styles.l15Typo]}>H:29°</Text>
          <Text style={[styles.seoul, styles.seoulTypo]}>Seoul</Text>
          <Text style={[styles.pm, styles.pmTypo]}>PM</Text>
          <Text style={[styles.text, styles.pmTypo]}>9:11</Text>
        </View>
        <Text
          style={[styles.notAsWarm, styles.notAsWarmTypo]}
        >{`Not as warm tomorrow, with
a high of 26°`}</Text>
        <Text style={[styles.text1, styles.textTypo]}>22°</Text>
      </View>
      <View style={[styles.list1, styles.list1Position]}>
        <Image
          style={[styles.groupIcon1, styles.rectanglePosition]}
          contentFit="cover"
          source={require("../assets/group1.png")}
        />
        <Text style={[styles.l151, styles.l151Layout]}>L:15°</Text>
        <Text style={[styles.h291, styles.l151Layout]}>H:29°</Text>
        <Text style={[styles.partlyCloudy, styles.myLocationPosition]}>
          Partly Cloudy
        </Text>
        <Text style={[styles.myLocation, styles.myLocationPosition]}>
          My Location
        </Text>
        <Text style={[styles.seongnamSi, styles.myLocationPosition]}>
          Seongnam-si
        </Text>
        <Text style={[styles.text2, styles.l151Position]}>21°</Text>
      </View>
      <View style={[styles.searchBar, styles.searchBarLayout]}>
        <View style={[styles.rectangle, styles.rectangleBg]} />
        <Text style={[styles.searchForA, styles.text3Typo]}>
          Search for a city or airport
        </Text>
        <Text style={[styles.text3, styles.text3Typo]}>􀊫</Text>
      </View>
      <Text style={[styles.weather, styles.seoulTypo]}>Weather</Text>
      <Text style={[styles.text4, styles.l15Typo]}>􀍡</Text>
      <View style={styles.darkModetrueTypedefault}>
        <Image
          style={styles.groupIcon2}
          contentFit="cover"
          source={require("../assets/group2.png")}
        />
        <View style={[styles.group1, styles.iconLayout]}>
          <Battery
            style={[styles.batteryIcon, styles.iconLayout]}
            width={24}
            height={11}
          />
          <Wifi
            style={[styles.wifiIcon, styles.iconLayout]}
            width={15}
            height={11}
          />
          <Mobilesignal
            style={[styles.mobileSignalIcon, styles.iconLayout]}
            width={17}
            height={11}
          />
        </View>
        <Group3 style={styles.groupIcon3} width={54} height={21} />
      </View>
      <View style={[styles.frame, styles.groupPosition]}>
        <View style={[styles.rectangle1, styles.rectangleBg]} />
      </View>
      <View style={[styles.searchSaveChild, styles.l151Position]} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoIconLayout: {
    maxWidth: "100%",
    overflow: "hidden",
  },
  groupPosition: {
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  l15Typo: {
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
  },
  seoulTypo: {
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  pmTypo: {
    letterSpacing: 0.2,
    marginTop: -21.5,
    color: Color.colorWhite,
    lineHeight: 20,
    fontSize: FontSize.size_mini,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    fontWeight: "500",
    top: "50%",
    position: "absolute",
  },
  notAsWarmTypo: {
    fontSize: FontSize.size_base,
    letterSpacing: 0.2,
  },
  textTypo: {
    fontWeight: "300",
    fontSize: FontSize.size_34xl,
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
  },
  list1Position: {
    width: 335,
    left: "50%",
    position: "absolute",
  },
  rectanglePosition: {
    bottom: "0%",
    top: "0%",
    height: "100%",
  },
  l151Layout: {
    top: "73.48%",
    height: "17.08%",
    lineHeight: 20,
    fontWeight: "500",
  },
  myLocationPosition: {
    marginLeft: -151.5,
    left: "50%",
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    position: "absolute",
  },
  l151Position: {
    left: "50%",
    position: "absolute",
  },
  searchBarLayout: {
    width: 325,
    left: "50%",
  },
  rectangleBg: {
    backgroundColor: Color.colorWhite,
    position: "absolute",
  },
  text3Typo: {
    opacity: 0.5,
    letterSpacing: 0.6,
    fontSize: FontSize.size_lgi,
    height: "59.02%",
    left: "50%",
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    position: "absolute",
  },
  iconLayout: {
    height: 11,
    position: "absolute",
  },
  logoIcon: {
    right: "52.28%",
    left: "41.33%",
    maxHeight: "100%",
    bottom: "36.83%",
    top: "60.22%",
    maxWidth: "100%",
    position: "absolute",
  },
  logoIcon1: {
    right: "41.35%",
    left: "52.26%",
    maxHeight: "100%",
    bottom: "36.83%",
    top: "60.22%",
    maxWidth: "100%",
    position: "absolute",
  },
  weatherData: {
    textDecoration: "underline",
  },
  learnMoreAboutContainer: {
    marginTop: 166,
    width: "70.7%",
    left: "11.95%",
    fontSize: 13,
    letterSpacing: 0.5,
    color: Color.colorGray_100,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    fontWeight: "500",
    lineHeight: 19,
    top: "50%",
    position: "absolute",
  },
  groupIcon: {
    marginTop: -58.5,
    right: "0%",
    height: 117,
    top: "50%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  l15: {
    width: "11.03%",
    left: "83.27%",
    lineHeight: 20,
    marginTop: 27.5,
    color: Color.colorWhite,
    letterSpacing: 0.8,
    fontSize: FontSize.size_mini,
    fontWeight: "500",
    top: "50%",
    position: "absolute",
  },
  h29: {
    width: "12.55%",
    left: "68.36%",
    lineHeight: 20,
    marginTop: 27.5,
    color: Color.colorWhite,
    letterSpacing: 0.8,
    fontSize: FontSize.size_mini,
    fontWeight: "500",
    top: "50%",
    position: "absolute",
  },
  seoul: {
    marginTop: -48.5,
    width: "19.09%",
    fontSize: FontSize.size_6xl,
    letterSpacing: -0.2,
    left: "4.79%",
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    top: "50%",
    position: "absolute",
  },
  pm: {
    width: "6.58%",
    left: "13.73%",
  },
  text: {
    width: "8.06%",
    left: "4.79%",
  },
  group: {
    marginTop: -58.5,
    right: "0%",
    height: 117,
    top: "50%",
  },
  notAsWarm: {
    marginTop: 8.5,
    width: "58.21%",
    left: "4.79%",
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    fontWeight: "500",
    position: "absolute",
    lineHeight: 19,
    fontSize: FontSize.size_base,
    top: "50%",
  },
  text1: {
    marginTop: -54.5,
    width: "24.79%",
    left: "71.64%",
    letterSpacing: 1.6,
    top: "50%",
    position: "absolute",
  },
  list: {
    marginTop: -47,
    width: "76.74%",
    right: "12.79%",
    left: "10.47%",
    height: 117,
    top: "50%",
    position: "absolute",
  },
  groupIcon1: {
    marginLeft: -167.5,
    width: 335,
    left: "50%",
    position: "absolute",
    maxHeight: "100%",
  },
  l151: {
    marginLeft: 111.5,
    width: 37,
    left: "50%",
    position: "absolute",
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    letterSpacing: 0.8,
    fontSize: FontSize.size_mini,
    top: "73.48%",
  },
  h291: {
    marginLeft: 61.5,
    width: 42,
    left: "50%",
    position: "absolute",
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    letterSpacing: 0.8,
    fontSize: FontSize.size_mini,
    top: "73.48%",
  },
  partlyCloudy: {
    width: 94,
    top: "73.48%",
    height: "17.08%",
    lineHeight: 20,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    letterSpacing: 0.2,
  },
  myLocation: {
    height: "25.62%",
    top: "8.54%",
    width: 137,
    fontWeight: "700",
    letterSpacing: -0.2,
    fontSize: FontSize.size_6xl,
  },
  seongnamSi: {
    top: "32.43%",
    width: 95,
    height: "17.08%",
    marginLeft: -151.5,
    fontSize: FontSize.size_base,
    letterSpacing: 0.2,
    lineHeight: 20,
    fontWeight: "500",
  },
  text2: {
    height: "53.86%",
    marginLeft: 72.5,
    top: "3.45%",
    letterSpacing: 5.6,
    width: 82,
    fontWeight: "300",
    fontSize: FontSize.size_34xl,
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
  },
  list1: {
    height: "14%",
    marginLeft: -170,
    top: "26.11%",
    bottom: "59.89%",
  },
  rectangle: {
    marginLeft: -162.5,
    borderRadius: 10,
    opacity: 0.1,
    width: 325,
    left: "50%",
    bottom: "0%",
    top: "0%",
    height: "100%",
  },
  searchForA: {
    marginLeft: -131.2,
    top: "22.95%",
    width: 207,
  },
  text3: {
    marginLeft: -156.8,
    top: "20.61%",
    width: 22,
  },
  searchBar: {
    height: "4.91%",
    marginLeft: -165,
    top: "17.77%",
    bottom: "77.32%",
    position: "absolute",
  },
  weather: {
    top: 92,
    left: 49,
    fontSize: FontSize.size_18xl,
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    position: "absolute",
  },
  text4: {
    top: 52,
    left: 330,
    fontSize: FontSize.size_5xl,
    width: 74,
    fontWeight: "500",
    color: Color.colorWhite,
    position: "absolute",
  },
  groupIcon2: {
    top: -2,
    left: 78,
    width: 0,
    height: 0,
    position: "absolute",
  },
  batteryIcon: {
    right: 0,
    top: 0,
  },
  wifiIcon: {
    right: 29,
    top: 0,
  },
  mobileSignalIcon: {
    right: 50,
    top: 0,
  },
  group1: {
    top: 17,
    right: 15,
    width: 67,
  },
  groupIcon3: {
    top: 12,
    left: 21,
    position: "absolute",
  },
  darkModetrueTypedefault: {
    right: 10,
    left: 0,
    height: 44,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  rectangle1: {
    top: 7,
    left: 121,
    borderRadius: Border.br_15xl,
    width: 134,
    height: 5,
  },
  frame: {
    bottom: 0,
    height: 20,
    overflow: "hidden",
  },
  searchSaveChild: {
    height: "0.06%",
    marginLeft: -183.2,
    top: "69.41%",
    bottom: "30.53%",
    borderStyle: "solid",
    borderColor: Color.colorGray_100,
    borderTopWidth: 0.5,
    width: 336,
    opacity: 0.3,
  },
  searchSave: {
    backgroundColor: "#000",
    flex: 1,
    height: 870,
    overflow: "hidden",
    width: "100%",
  },
});

export default SearchSave;
