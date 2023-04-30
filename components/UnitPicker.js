import { View, StyleSheet } from "react-native";
import React from "react";
// import { Picker } from "@react-native-community/picker";
import { Picker } from "@react-native-picker/picker";

const UnitPicker = ({ unitItem, setUnitItem }) => {
	return (
		<View style={styles.unitsSystem}>
			<Picker
				selectedValue={unitItem}
				onValueChange={(itemValue, itemIndex) => setUnitItem(itemValue)}
			>
				<Picker.Item label="C" value="metric" />
				<Picker.Item label="F" value="imperial" />
			</Picker>
		</View>
	);
};

export default UnitPicker;

const styles = StyleSheet.create({
	unitsSystem: {
		position: "absolute",
		...Platform.select({
			ios: {
				top: -30,
			},
			android: {
				top: 50,
			},
		}),

		left: 20,
		height: 50,
		width: 100,
	},
});
