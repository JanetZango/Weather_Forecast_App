import * as React from "react";
import { ScrollView, StyleSheet, View, PermissionsAndroid, Platform, Text, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import Battery from "../assets/battery.svg";
import Wifi from "../assets/wifi.svg";
import Mobilesignal from "../assets/mobile-signal.svg";
import Group3 from "../assets/group3.svg";
import Frame from "../assets/frame.svg";
import Vector from "../assets/vector.svg";
import Ellipse from "../assets/ellipse.svg";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useState, useEffect } from 'react';
import { FAB } from 'react-native-elements';
import axios from 'axios';



interface GeoPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
  timestamp: number;
}
interface DataType {
  date: string;
  data: unknown;
}
type Props = {
  navigation: any;
};



const CurrentWeather  = ({ navigation }: any) =>{
  const [location, setLocation] = useState<GeoPosition | null>(null);
  const [longitude, setLongitude] = useState<string | number>("");
  const [latitude, setLatitude] = useState<string | number>("");
  const [cityname, setCityName] = useState('');
  const [weatherstatus, setWeatherStatus] = useState('');
  const [humidity, setHumidity] = useState('');
  const [weatherdata, setWeatherData] = useState('');
  const [forecast, setForecast] = useState<DataType[]>([]);
  const [error, setError] = useState(null);



  // const requestLocationPermission = async () => {
  //   try {
  //     if (Platform.OS === 'android') {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('Location permission granted');
  //         return true;
  //       } else {
  //         console.log('Location permission denied');
  //         return false;
  //       }
  //     } else {
  //       const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  //       if (result === RESULTS.GRANTED) {
  //         console.log('Location permission granted');
  //         return true;
  //       } else {
  //         console.log('Location permission denied');
  //         return false;
  //       }
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //     return false;
  //   }
  // };
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        setLocation(position);
        const getLongitude = position.coords.longitude
        const getLatitude = position.coords.latitude
        const fetchData = async () => {
          const appid = "16ea865e0fb96ed2bbafbef75005c594";
          try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${getLatitude}&lon=${getLongitude}&appid=${appid}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result)
            setCityName(result.name);
            setWeatherStatus(result.weather[0].description);
            setHumidity(result.main.humidity)
            const getcityName = result.name
            console.log(getcityName)
          } catch (err) {
          } finally {
          }
        };
        fetchData();
        const FiveDayForecast = async () => {
          const appid = "16ea865e0fb96ed2bbafbef75005c594";
          // console.log(cityname,getLatitude,"no no")
          try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=midrand&appid=${appid}&units=metric`);
            // if (!response.ok) {
            //   throw new Error('Network response was not ok');
            // }
            // const result = await response.json();
            // console.log(result.list,"yest")
            // const forecastData = result.data.list.slice(0, 40);
            // console.log(forecastData)
            // setWeatherData(forecastData);
            // setWeatherStatus(result.weather[0].description);
            // setHumidity(result.main.humidity)
            const groupedData = response.data.list.reduce((acc: any, item: any) => {
              const date = item.dt_txt.split(' ')[0]; // Extract the date
              console.log(date)
              // const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
              // console.log(days)
              // // const date = new Date(timestamp * 1000);
              // console.log(days[date.getDay()])
              // return days[date.getDay()];
              if (!acc[date]) acc[date] = [];
              acc[date].push(item);
              return acc;
              console.log(acc)
            }, {});
            const groupedArray = Object.entries(groupedData).map(([date, data]) => ({
              date,
              data,
            }));
            console.log(groupedArray)
            setForecast(groupedArray);
          } catch (err) {
          } finally {
          }
        };
        FiveDayForecast();
      },
      (error) => {
        console.log(error)
        // Alert.alert('Error', error.message);
        // console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };


  async function CurrentWeatherByCityName() {
    console.log(latitude, "hi")
    try {
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=midrand&appid=16ea865e0fb96ed2bbafbef75005c594');
      // console.log(response)
      const data = await response.json();
      // console.log(data.list)
      // setCityName(data.name);
      // setWeatherStatus(data.weather[0].description);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getCurrentLocation();
    CurrentWeatherByCityName();

  }, []);

  return (
    <LinearGradient
      style={styles.currentWeather}
      locations={[0, 1]}
      colors={["#121923", "#2b3142"]}
    >
      <ScrollView
        style={[styles.scrollview, styles.scrollviewLayout]}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.currentWeatherScrollViewContent}


      >


        <View style={[styles.img, styles.imgPosition]}>
        <FAB
                icon={{ name: 'search', color: 'white' }}
                color="#6200ee"
                placement="right"
                style={styles.fab}
                onPress={() => navigation.navigate("SearchSave")}
              />
          <LinearGradient
            style={[styles.rectangle, styles.imgPosition]}
            locations={[0, 1]}
            colors={["#101623", "#2a3040"]}
          />
               <FAB
                icon={{ name: 'search', color: 'white' }}
                color="#6200ee"
                placement="right"
                style={styles.fab}
                onPress={() => navigation.navigate("SearchSave")}
              />
          <Image
            style={[styles.imageIcon, styles.imageIconPosition]}
            contentFit="cover"
            source={require("../assets/image.png")}
          />
          <Image
            style={[styles.imageIcon1, styles.imageIconPosition]}
            contentFit="cover"
            source={require("../assets/image1.png")}
          />
          <LinearGradient
            style={styles.rectangle1}
            locations={[0, 0.29, 0.67, 1]}
            colors={[
              "rgba(28, 35, 43, 0)",
              "#1c232b",
              "#1c232b",
              "rgba(28, 35, 43, 0)",
            ]}
          />
        </View>
        <FAB
                icon={{ name: 'search', color: 'white' }}
                color="#6200ee"
                placement="right"
                style={styles.fab}
                onPress={() => navigation.navigate("SearchSave")}
              />
        <View style={styles.darkModetrueTypedefault}>
          <Image
            style={styles.groupIcon}
            contentFit="cover"
            source={require("../assets/group4.png")}
          />
          <View style={[styles.group, styles.iconLayout]}>
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
          <FAB
                icon={{ name: 'search', color: 'white' }}
                color="#6200ee"
                placement="right"
                style={styles.fab}
                onPress={() => navigation.navigate("SearchSave")}
              />
          <Group3 style={styles.groupIcon1} width={54} height={21} />
        </View>
   
        <View style={styles.top}>
          <Text style={[styles.partlyCloudy, styles.rectangle5Position]}>
            {weatherstatus}
          </Text>
          <Text style={[styles.seongnamSi, styles.textTypo8]}>{cityname}</Text>
          <Text style={[styles.text, styles.textTypo8]}>{humidity}°</Text>
        </View>
        {/* <FAB
                icon={{ name: 'search', color: 'white' }}
                color="#6200ee"
                placement="right"
                style={styles.fab}
                onPress={() => navigation.navigate("SearchSave")}
              /> */}

        <FlatList
          data={forecast}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.date}>{item.date}</Text>
              {item.data.map((entry: any, index: any) => (
                <Text key={index} style={styles.info}>
                  {entry.dt_txt.split(' ')[0]}: {entry.main.temp}°C,{' '}
                  {entry.weather[0].description}
                </Text>
              ))}
           
            </View>

          )}
        />   
          {/* <FAB
        icon={{ name: 'search', color: 'white' }}
        color="#6200ee"
        placement="right"
        style={styles.fab}
        onPress={() => navigation.navigate("SearchSave")}
      /> */}

        <View style={styles.card1}>
          <View style={styles.rectangle2} />
          <View style={styles.frame}>
            <Text style={[styles.text11, styles.textTypo3]}>50%</Text>
            <Image
              style={[styles.groupIcon2, styles.groupIconLayout]}
              contentFit="cover"
              source={require("../assets/group5.png")}
            />
            <Frame
              style={[styles.frameIcon, styles.frameIconLayout]}
              width={25}
              height={8}
            />
            <Text style={[styles.text12, styles.textTypo6]}>25°</Text>
            <Text style={[styles.text13, styles.line4Position]}>20°</Text>
            <Text style={[styles.tue, styles.textTypo6]}>Tue</Text>
            <View style={[styles.frame1, styles.frameLayout]} />
            <Vector
              style={[styles.vectorIcon, styles.frameIconPosition1]}
              width={25}
              height={25}
            />
          </View>
          {/* <FAB
                icon={{ name: 'search', color: 'white' }}
                color="#6200ee"
                placement="right"
                style={styles.fab}
                onPress={() => navigation.navigate("SearchSave")}
              /> */}
          <View style={[styles.frame2, styles.framePosition]}>
            <View style={[styles.frame3, styles.frameIconPosition]} />
            <View style={[styles.group1, styles.lineLayout]}>
              <View style={[styles.line1, styles.lineLayout]} />
              <Text style={[styles.mon, styles.monTypo]}>Mon</Text>
              <Text style={[styles.text14, styles.textTypo2]}>18°</Text>
              <Text style={[styles.text15, styles.textTypo1]}>27°</Text>
              <Image
                style={[styles.groupIcon3, styles.groupIconLayout]}
                contentFit="cover"
                source={require("../assets/group6.png")}
              />
              <Frame
                style={[styles.frameIcon1, styles.frameIconPosition]}
                width={25}
                height={8}
              />
              <Vector
                style={[styles.vectorIcon1, styles.frameIconPosition]}
                width={25}
                height={25}
              />
                   <FAB
                icon={{ name: 'search', color: 'white' }}
                color="#6200ee"
                placement="right"
                style={styles.fab}
                onPress={() => navigation.navigate("SearchSave")}
              />
              <Text style={[styles.text16, styles.textTypo3]}>60%</Text>
            </View>
          </View>
          <View style={[styles.frame4, styles.framePosition]}>
            <View style={[styles.line2, styles.lineLayout]} />
            <Image
              style={[styles.groupIcon4, styles.groupIconLayout]}
              contentFit="cover"
              source={require("../assets/group7.png")}
            />
            <Text style={[styles.text17, styles.textTypo1]}>29°</Text>
            <Text style={[styles.text18, styles.textTypo2]}>15°</Text>
            <Text style={styles.text19}>􀆮</Text>
            <Text style={[styles.today, styles.monTypo]}>Today</Text>
          </View>
          <View style={[styles.line3, styles.lineLayout]} />
          <Text style={[styles.dayForecast, styles.text20Typo]}>
            5-DAY FORECAST
          </Text>

          <Text style={[styles.text20, styles.text20Typo]}>􀉉</Text>
        </View>
        <View style={styles.nav}>
          <View style={[styles.rectangle4, styles.frame5Position]} />
          <View style={[styles.frame5, styles.frame5Position]}>
            <View style={[styles.rectangle5, styles.rectangle5Position]} />
          </View>
          <Ellipse
            style={[styles.ellipseIcon, styles.scrollviewLayout]}
            width={2}
            height={9}
          />
          <Text style={[styles.text21, styles.textTypo6]}>􀋒</Text>
          <Text style={[styles.text22, styles.textTypo]}>􀋲</Text>
          <Text style={[styles.text23, styles.textTypo]}>􀙊</Text>
          <View style={[styles.line4, styles.line4Position]} />
        </View>
        <View style={styles.container}>

        </View>
        <View style={styles.container}>
          {/* Your other UI components go here */}


        </View>
      </ScrollView>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    top: 10, // Adjust the top value to place it as needed
    right: 20, // Adjust the right value to position it horizontally
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    color: '#fff'
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff'
  },
  info: {
    fontSize: 14,
    color: '#fff',
  },

  currentWeatherScrollViewContent: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 21,
  },
  scrollviewLayout: {
    maxWidth: "100%",
    overflow: "hidden",
  },
  imgPosition: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    position: "absolute",
  },
  imageIconPosition: {
    maxHeight: "100%",
    left: 0,
    right: 0,
    top: 0,
    position: "absolute",
    maxWidth: "100%",
    overflow: "hidden",
  },
  iconLayout: {
    height: 11,
    position: "absolute",
  },
  textTypo8: {
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.sFProDisplay,
  },
  rectangle5Position: {
    left: 121,
    position: "absolute",
  },
  textTypo6: {
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.sFProDisplay,
  },
  textTypo5: {
    top: "58.48%",
    textAlign: "left",
    fontSize: FontSize.size_3xl,
    height: "12.25%",
    left: "50%",
    color: Color.colorWhite,
    fontFamily: FontFamily.sFProDisplay,
    fontWeight: "500",
    position: "absolute",
  },
  textTypo4: {
    width: 28,
    top: "58.48%",
    textAlign: "left",
    fontSize: FontSize.size_3xl,
    height: "12.25%",
    left: "50%",
    color: Color.colorWhite,
    fontFamily: FontFamily.sFProDisplay,
    fontWeight: "500",
    position: "absolute",
  },
  amTypo: {
    fontSize: FontSize.size_mid,
    top: "37.75%",
    height: "9.44%",
    textAlign: "left",
    left: "50%",
    color: Color.colorWhite,
    fontFamily: FontFamily.sFProDisplay,
    fontWeight: "500",
    position: "absolute",
  },
  am1Typo: {
    width: 40,
    fontSize: FontSize.size_mid,
    top: "37.75%",
    height: "9.44%",
    textAlign: "left",
    left: "50%",
    color: Color.colorWhite,
    fontFamily: FontFamily.sFProDisplay,
    fontWeight: "500",
    position: "absolute",
  },
  lineBorder: {
    opacity: 0.5,
    borderTopWidth: 0.2,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
  },
  textTypo3: {
    color: Color.colorLightskyblue,
    fontWeight: "600",
    fontSize: FontSize.size_mini,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    position: "absolute",
  },
  groupIconLayout: {
    height: 4,
    width: 100,
    position: "absolute",
  },
  frameIconLayout: {
    height: 8,
    overflow: "hidden",
  },
  line4Position: {
    opacity: 0.3,
    position: "absolute",
  },
  frameLayout: {
    height: 17,
    top: 7,
    overflow: "hidden",
  },
  frameIconPosition1: {
    width: 25,
    left: 72,
    position: "absolute",
  },
  framePosition: {
    width: 303,
    height: "20.01%",
    marginLeft: -152.5,
    left: "50%",
    position: "absolute",
    overflow: "hidden",
  },
  frameIconPosition: {
    left: 73,
    width: 25,
    position: "absolute",
  },
  lineLayout: {
    width: 305,
    position: "absolute",
  },
  monTypo: {
    left: 1,
    textAlign: "left",
    fontSize: FontSize.size_3xl,
    color: Color.colorWhite,
    fontFamily: FontFamily.sFProDisplay,
    fontWeight: "500",
    position: "absolute",
  },
  textTypo2: {
    left: 115,
    opacity: 0.3,
    textAlign: "left",
    fontSize: FontSize.size_3xl,
    color: Color.colorWhite,
    fontFamily: FontFamily.sFProDisplay,
    fontWeight: "500",
    position: "absolute",
  },
  textTypo1: {
    left: 267,
    textAlign: "left",
    fontSize: FontSize.size_3xl,
    color: Color.colorWhite,
    fontFamily: FontFamily.sFProDisplay,
    fontWeight: "500",
    position: "absolute",
  },
  text20Typo: {
    top: "5.11%",
    height: "6.54%",
    fontSize: FontSize.size_mini,
    textAlign: "left",
    left: "50%",
    color: Color.colorWhite,
    fontFamily: FontFamily.sFProDisplay,
    fontWeight: "500",
    position: "absolute",
  },
  frame5Position: {
    left: "0%",
    right: "0%",
    bottom: 0,
    position: "absolute",
    width: "100%",
  },
  textTypo: {
    fontSize: FontSize.size_4xl,
    bottom: 43,
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.sFProDisplay,
    fontWeight: "500",
    position: "absolute",
  },
  rectangle: {
    left: 0,
    backgroundColor: "transparent",
  },
  imageIcon: {
    bottom: 372,
  },
  imageIcon1: {
    bottom: 365,
  },
  rectangle1: {
    top: 274,
    bottom: 78,
    left: 0,
    right: 0,
    position: "absolute",
    backgroundColor: "transparent",
  },
  img: {
    zIndex: 0,
    left: 0,
  },
  groupIcon: {
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
  group: {
    top: 17,
    right: 15,
    width: 67,
  },
  groupIcon1: {
    top: 12,
    left: 21,
    position: "absolute",
  },
  darkModetrueTypedefault: {
    width: 349,
    height: 44,
    zIndex: 1,
    overflow: "hidden",
  },
  h29L15: {
    top: 170,
    left: 132,
    fontSize: 21,
    fontWeight: "500",
    position: "absolute",
  },
  partlyCloudy: {
    top: 140,
    fontSize: FontSize.size_5xl,
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.sFProDisplay,
  },
  seongnamSi: {
    left: 84,
    fontSize: FontSize.size_18xl,
    letterSpacing: -0.2,
    top: 0,
    position: "absolute",
  },
  text: {
    top: 29,
    left: 135,
    fontSize: 102,
    letterSpacing: -0.5,
    fontWeight: "100",
    position: "absolute",
  },
  top: {
    width: 375,
    height: 205,
    zIndex: 2,
    overflow: "hidden",
  },
  rectangle2: {
    height: "100%",
    marginLeft: -167.5,
    top: "0%",
    bottom: "0%",
    borderRadius: Border.br_mini,
    backgroundColor: Color.colorGray_300,
    borderColor: Color.colorGray_200,
    borderWidth: 0.5,
    opacity: 0.2,
    borderStyle: "solid",
    left: "50%",
    width: 335,
    position: "absolute",
  },
  text1: {
    marginLeft: 118.5,
    width: 34,
    letterSpacing: 0.1,
    top: "82.08%",
    height: "12.25%",
    textAlign: "left",
    fontSize: FontSize.size_3xl,
    left: "50%",
    fontWeight: "500",
    position: "absolute",
  },
  text2: {
    marginLeft: 50.5,
    width: 34,
    letterSpacing: 0.1,
    top: "82.08%",
    height: "12.25%",
    textAlign: "left",
    fontSize: FontSize.size_3xl,
    left: "50%",
    fontWeight: "500",
    position: "absolute",
  },
  text3: {
    marginLeft: -17.5,
    width: 34,
    letterSpacing: 0.1,
    top: "82.08%",
    height: "12.25%",
    textAlign: "left",
    fontSize: FontSize.size_3xl,
    left: "50%",
    fontWeight: "500",
    position: "absolute",
  },
  text4: {
    marginLeft: -83.5,
    width: 32,
    letterSpacing: 0.1,
    top: "82.08%",
    height: "12.25%",
    textAlign: "left",
    fontSize: FontSize.size_3xl,
    left: "50%",
    fontWeight: "500",
    position: "absolute",
  },
  text5: {
    marginLeft: -149.5,
    width: 32,
    letterSpacing: 0.1,
    top: "82.08%",
    height: "12.25%",
    textAlign: "left",
    fontSize: FontSize.size_3xl,
    left: "50%",
    fontWeight: "500",
    position: "absolute",
  },
  text6: {
    marginLeft: 119.5,
    width: 32,
  },
  text7: {
    marginLeft: 55.5,
  },
  text8: {
    marginLeft: -18.5,
    width: 27,
  },
  text9: {
    marginLeft: -89.5,
  },
  text10: {
    marginLeft: -148.5,
    width: 30,
  },
  am: {
    width: 30,
    marginLeft: 119.5,
  },
  am1: {
    marginLeft: 50.5,
  },
  pm: {
    marginLeft: -16.5,
    width: 37,
  },
  pm1: {
    marginLeft: -86.5,
  },
  now: {
    marginLeft: -150.5,
    width: 34,
  },
  line: {
    height: "0.1%",
    marginLeft: -153.6,
    top: "31.07%",
    bottom: "68.83%",
    width: 320,
    left: "50%",
    position: "absolute",
  },
  cloudyConditionsFromContainer: {
    height: "19.83%",
    top: "4.72%",
    fontSize: 18,
    width: 288,
    marginLeft: -152.5,
    left: "50%",
    position: "absolute",
  },
  card: {
    height: 199,
    zIndex: 3,
    width: 335,
  },
  text11: {
    top: 33,
    left: 68,
  },
  groupIcon2: {
    left: 159,
    top: 26,
  },
  frameIcon: {
    top: 25,
    left: 72,
    position: "absolute",
  },
  text12: {
    left: 266,
    top: 14,
    fontSize: FontSize.size_3xl,
    textAlign: "left",
    fontWeight: "500",
    position: "absolute",
  },
  text13: {
    left: 114,
    top: 14,
    textAlign: "left",
    color: Color.colorWhite,
    fontFamily: FontFamily.sFProDisplay,
    fontSize: FontSize.size_3xl,
    fontWeight: "500",
  },
  tue: {
    top: 14,
    fontSize: FontSize.size_3xl,
    textAlign: "left",
    fontWeight: "500",
    left: 0,
    position: "absolute",
  },
  frame1: {
    width: 25,
    left: 72,
    position: "absolute",
  },
  vectorIcon: {
    top: 7,
  },
  frame: {
    marginLeft: -151.5,
    top: "53.79%",
    bottom: "26.2%",
    width: 302,
    height: "20.01%",
    left: "50%",
    position: "absolute",
    overflow: "hidden",
  },
  frame3: {
    height: 17,
    top: 7,
    overflow: "hidden",
  },
  line1: {
    top: 48,
    opacity: 0.5,
    borderTopWidth: 0.2,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    height: 0,
    left: 0,
  },
  mon: {
    top: 7,
  },
  text14: {
    top: 7,
  },
  text15: {
    top: 7,
  },
  groupIcon3: {
    top: 19,
    left: 160,
  },
  frameIcon1: {
    top: 18,
    overflow: "hidden",
  },
  vectorIcon1: {
    top: 0,
  },
  text16: {
    left: 69,
    top: 26,
  },
  group1: {
    height: 48,
    top: 7,
    left: 0,
  },
  frame2: {
    top: "33.82%",
    bottom: "46.17%",
  },
  line2: {
    top: 55,
    opacity: 0.5,
    borderTopWidth: 0.2,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    height: 0,
    left: 0,
  },
  groupIcon4: {
    left: 158,
    top: 26,
  },
  text17: {
    top: 14,
  },
  text18: {
    top: 14,
  },
  text19: {
    letterSpacing: 1.1,
    color: "#f8d74a",
    top: 14,
    left: 72,
    textAlign: "left",
    fontSize: FontSize.size_3xl,
    fontFamily: FontFamily.sFProDisplay,
    fontWeight: "500",
    position: "absolute",
  },
  today: {
    top: 14,
  },
  frame4: {
    top: "13.82%",
    bottom: "66.18%",
  },
  line3: {
    height: "0.08%",
    marginLeft: -152.6,
    top: "13.78%",
    bottom: "86.15%",
    opacity: 0.5,
    borderTopWidth: 0.2,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    left: "50%",
  },
  dayForecast: {
    marginLeft: -128.5,
    width: 132,
  },
  text20: {
    width: 19,
    marginLeft: -152.5,
  },
  card1: {
    height: 258,
    zIndex: 4,
    width: 335,
  },
  rectangle4: {
    backgroundColor: "#2a3040",
    height: 78,
  },
  rectangle5: {
    borderRadius: Border.br_15xl,
    backgroundColor: Color.colorWhite,
    width: 134,
    height: 5,
    top: 7,
  },
  frame5: {
    height: 20,
    overflow: "hidden",
  },
  ellipseIcon: {
    right: "45.61%",
    bottom: 51,
    left: "52%",
    position: "absolute",
  },
  text21: {
    width: "3.74%",
    bottom: 49,
    left: "45.61%",
    fontSize: 11,
    fontWeight: "500",
    position: "absolute",
  },
  text22: {
    width: "7.73%",
    left: "86.93%",
  },
  text23: {
    width: "8%",
    left: "5.34%",
  },
  line4: {
    width: "100.1%",
    right: "-0.05%",
    left: "-0.05%",
    shadowColor: "rgba(255, 255, 255, 0.4)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 1,
    borderTopWidth: 0.4,
    borderColor: Color.colorWhite,
    opacity: 0.3,
    borderStyle: "solid",
    height: 0,
    bottom: 78,
  },
  nav: {
    width: 401,
    zIndex: 5,
    height: 78,
  },
  scrollview: {
    flex: 1,
    backgroundColor: "transparent",
    width: "100%",
  },
  currentWeather: {
    width: "100%",
  },
});

export default CurrentWeather;
