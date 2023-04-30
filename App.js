import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import UnitPicker from "./components/UnitPicker";
import { colors } from "./utils/index";
import RefreshIcon from "./components/RefreshIcon";
import WeatherInfo from "./components/WeatherInfo";
import WeatherDetails from "./components/WeatherDetails";
const weatherAPI_KEY = "60eba04b174d7ad05c277b81fc3abdeb";
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?";
export default function App() {
	const [error, setError] = useState(null);
	const [currentWeather, setCurrentWeather] = useState(null);
	const [weatherDetails, setWeatherDetails] = useState(null);
	const [unitSystem, setUnitSystem] = useState("metric");

	const fetchWeatherApi = async () => {
		setError(null);
		setCurrentWeather(null);
		setWeatherDetails(null);

		try {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setError("Permission to access location was denied");
				return;
			}
			let location = await Location.getCurrentPositionAsync({});
			setCurrentWeather(location);
			// console.log(location);
			const { latitude, longitude } = location.coords;
			// console.log(latitude, longitude);
			const newWeatherUrl = `${weatherURL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${weatherAPI_KEY}`;
			const response = await fetch(newWeatherUrl);
			const result = await response.json();
			// console.log(result);

			if (response) {
				setCurrentWeather(result.main.temp);
				// console.log(result.main);
				setWeatherDetails(result);
				// console.log(weatherDetails);
			} else {
				setError(result.message);
				// console.log(setError("failed to load resource"));
			}
		} catch (error) {}
	};
	useEffect(() => {
		fetchWeatherApi();
	}, [unitSystem]);
	if (weatherDetails) {
		return (
			<View style={styles.container}>
				<StatusBar style="auto" />
				<View style={styles.main}>
					{/* Select temperature (celsius or fanreheit) */}
					<UnitPicker unitItem={unitSystem} setUnitItem={setUnitSystem} />
					{/* RefreshIcon */}
					<RefreshIcon load={fetchWeatherApi} />
					{/* Weather Summary */}
					<WeatherInfo
						currentWeather={currentWeather}
						currentWeatherDetails={weatherDetails}
					/>
					{/* Weather Details */}
					<WeatherDetails
						currentWeatherInfo={weatherDetails}
						unitSystem={unitSystem}
					/>
				</View>
			</View>
		);
	} else if (error) {
		return (
			<View style={styles.container}>
				<Text>{error}</Text>
				<StatusBar style="auto" />
			</View>
		);
	} else {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
				<StatusBar style="auto" />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: Platform.OS === "ios" ? 12 : 0,
		backgroundColor: "#fff",
		justifyContent: "center",
	},
	main: {
		flex: 1,
		justifyContent: "center",
	},
});
