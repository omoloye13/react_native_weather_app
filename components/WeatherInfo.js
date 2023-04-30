import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../utils/index";

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;
// Getting the weather details  of your location
const WeatherInfo = ({ currentWeatherDetails }) => {
	const {
		main: { temp },
		weather: [details],
		name,
	} = currentWeatherDetails;

	const { icon, main, description } = details;
	//weather condition api to get the icon
	const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
	return (
		<View style={styles.weatherInfo}>
			<Text style={{ fontWeight: 700, fontSize: 30 }}>{name}</Text>
			<Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
			<Text style={styles.textPrimary}>{temp}°</Text>
			<Text style={styles.weatherDescription}>{description}</Text>
			<Text style={styles.textSecondary}>{main}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	weatherInfo: {
		alignItems: "center",
		...Platform.select({
			ios: {
				marginTop: 0,
			},
			android: {
				marginTop: 30,
			},
		}),
	},
	weatherIcon: {
		width: 100,
		height: 100,
	},
	weatherDescription: {
		textTransform: "capitalize",
	},
	textPrimary: {
		fontSize: 40,
		color: PRIMARY_COLOR,
	},
	textSecondary: {
		fontSize: 20,
		color: SECONDARY_COLOR,
		fontWeight: "500",
		marginTop: 10,
	},
});

export default WeatherInfo;
