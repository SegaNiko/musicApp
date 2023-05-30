import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { apiBands } from "../api/bands";
import COLORS from "../constants/colors";
import { Button, CustomDropdown, Input } from "../components";
import musicalDirection from "../constants/musicalDirection";

export const BandSearch = () => {
  const [bands, setBands] = useState([]);

  const [musical_direction, setMusicalDirection] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    fetchBandsData();
  }, []);

  const fetchBandsData = () => {
    apiBands({
      musical_direction: musical_direction.toLocaleLowerCase(),
      name,
    }).then((res) => {
      setBands(res.bands);
    });
  };

  const renderTableRow = ({ item }) => {
    return (
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>{item.name}</Text>
        <Text style={styles.tableCell}>{item.email}</Text>
        <Text style={styles.tableCell}>{item.musical_direction}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 0 }} scrollEnabled={true}>
      <View style={styles.container}>
        <Text style={styles.heading}>Band Searcher</Text>

        <Input
          label="Band name"
          placeholder="Enter band name"
          onChange={setName}
          styleContainer={{
            marginHorizontal: 0,
          }}
        />
        <CustomDropdown
          stylesContainer={{
            marginHorizontal: 0,
          }}
          stylesDropdown={{ width: "100%" }}
          data={musicalDirection}
          onSelect={setMusicalDirection}
          emptyEl={{ label: "-", value: "none" }}
          placeholder="Select music direction"
          value={musical_direction}
        />

        <Button
          title="Search bands"
          filled
          style={{
            marginVertical: 15,
          }}
          onPress={fetchBandsData}
        />
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Name</Text>
            <Text style={styles.tableHeader}>Email</Text>
            <Text style={styles.tableHeader}>Direction</Text>
          </View>
          {bands.length === 0 ? (
            <Text style={styles.noResults}>No results</Text>
          ) : (
            <FlatList
              data={bands}
              keyExtractor={(item) => item._id}
              renderItem={renderTableRow}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 22,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 30,
    textAlign: "center",
  },
  table: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
    padding: 10,
    paddingTop: 0,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  tableHeader: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    padding: 10,
  },
  noResults: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
});
