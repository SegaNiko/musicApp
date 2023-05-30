import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";

import COLORS from "../constants/colors";
import { Button, CustomDropdown, Input } from "../components";
import instruments from "../constants/instruments";
import { apiMusicians } from "../api/musicians";

export const MusicianSearch = () => {
  const [musicians, setMusicians] = useState([]);

  const [instrument, setInstrument] = useState("");

  useEffect(() => {
    fetchMusicians();
  }, []);

  const fetchMusicians = () => {
    apiMusicians({ instrument: instrument.toLowerCase() }).then((res) => {
      setMusicians(res.musicians);
    });
  };

  const renderTableRow = ({ item }) => {
    return (
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>{item.name}</Text>
        <Text style={styles.tableCell}>{item.email}</Text>
        <Text style={styles.tableCell}>{item.instrument}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 0 }} scrollEnabled={true}>
      <View style={styles.container}>
        <Text style={styles.heading}>Musicians Searcher</Text>

        <CustomDropdown
          stylesContainer={{
            marginHorizontal: 0,
          }}
          stylesDropdown={{ width: "100%" }}
          data={instruments}
          onSelect={setInstrument}
          emptyEl={{ label: "-", value: "none" }}
          placeholder="Select instrument"
          value={instrument}
        />

        <Button
          title="Search musicians"
          filled
          style={{
            marginVertical: 15,
          }}
          onPress={fetchMusicians}
        />

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Name</Text>
            <Text style={styles.tableHeader}>Email</Text>
            <Text style={styles.tableHeader}>Direction</Text>
          </View>
          {musicians.length === 0 ? (
            <Text style={styles.noResults}>No results</Text>
          ) : (
            <FlatList
              data={musicians}
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
