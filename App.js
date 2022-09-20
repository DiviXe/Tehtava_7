import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import sampleData from "./Sampledata/sample_data";

export default function App() {
  const [rates, setRates] = useState({});
  const [selected, setSelected] = useState("");
  const [amount, setAmount] = useState("");
  const [eur, setEur] = useState("");

  const getCurrencyData = () => {
    setRates(sampleData.rates);
    console.warn("Huomio, sample dataa");
  };

  useEffect(() => {
    getCurrencyData();
  }, []);

  const convert = () => {
    const amountEur = Number(amount) / rates[selected];
    setEur(amountEur.toFixed(2) + " €");
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 350, height: 200 }}
        source={{
          uri: "https://thumbs.dreamstime.com/z/coins-chart-euro-banknotes-stock-exchange-money-rise-business-metaphor-34491567.jpg",
        }}
      />
      <Text style={styles.resultText}>{eur}</Text>
      <View style={styles.PickerView}>
        <TextInput
          placeholder={"Syötä numero"}
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
        <Picker
          style={styles.Picker}
          selectedValue={selected}
          onValueChange={(itemValue, itemIndex) => {
            console.log(itemValue, itemIndex);
            setSelected(itemValue);
          }}
        >
          {Object.keys(rates)
            .sort()
            .map((key) => (
              <Picker.Item label={key} value={key} key={key} />
            ))}
        </Picker>
      </View>
      <TouchableOpacity style={styles.Button} onPress={convert}>
        <Text>convert</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  Button: {
    height: 30,
    width: 70,
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 3,
    justifyContent: "center",
    backgroundColor: "gray",
    borderWidth: 1,
  },
  PickerView: {
    flexDirection: "row",
    marginTop: 4,
  },
  Picker: {
    height: 30,
    width: "30%",
    margin: 5,
  },
  resultText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
