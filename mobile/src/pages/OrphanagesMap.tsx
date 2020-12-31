import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather } from "@expo/vector-icons";

import mapMarker from "../images/maker.png";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import api from "../services/api";

interface Orphanages {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanages[]>([]);
  const navigation = useNavigation();
  //serve para cada vez que essa tela tiver foco ela ser recarregada
  useFocusEffect(() => {
    api.get("orphanages").then((response) => setOrphanages(response.data));
  });

  function handlerNavigateToDetails(id: number) {
    navigation.navigate("OrphanageDetails", { id });
  }

  function handlerNavigateToCreateNewOrphanage() {
    navigation.navigate("SelectMapPosition");
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -7.159044,
          longitude: -34.842122,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map((orphanage) => {
          return (
            <Marker
              icon={mapMarker}
              calloutAnchor={{
                x: 1.8,
                y: 0.6,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
              key={orphanage.id}
            >
              <Callout
                tooltip={true}
                onPress={() => handlerNavigateToDetails(orphanage.id)}
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {" "}
          {orphanages.length} Orfanatos encontrados
        </Text>
        <RectButton
          style={styles.createOrphanageButton}
          onPress={handlerNavigateToCreateNewOrphanage}
        >
          <Feather name="plus" size={20} color="#FFF"></Feather>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 16,
    justifyContent: "center",

    elevation: 10,
  },
  calloutText: {
    fontFamily: "Nunito_700Bold",
    color: "#0089a5",
    fontWeight: "700",
    fontSize: 14,
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 20,
  },
  footerText: {
    fontFamily: "Nunito_700Bold",
    color: "#8fa7b3",
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d6",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
});
