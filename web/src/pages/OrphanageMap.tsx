import React, { useEffect, useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import "leaflet/dist/leaflet.css";
import "../styles/pages/orphanage-map.css";
import mapMarker from "../images/Local.svg";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Orphanage {
  id: number;
  longitude: number;
  latitude: number;
  name: string;
}

function OrphanageMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  useEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <Link to="/">
            <img src={mapMarker} alt="Marcador" />
          </Link>

          <h2>Escolha um orfanato no mapa</h2>

          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong> João Pessoa</strong>
          <strong>Paraíba</strong>
        </footer>
      </aside>

      <Map
        center={[-7.1466036, -34.9516381]}
        zoom={14}
        style={{ width: "100%", height: "100%" }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        {orphanages.map((orphanage) => {
          return (
            <Marker
              position={[orphanage.latitude, orphanage.longitude]}
              icon={mapIcon}
              key={orphanage.id}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className=""
              >
                {orphanage.name}
                <Link to={`orphanage/${orphanage.id}`}>
                  <FiArrowRight size={20} color="fff" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>
      <Link className="create-orphanage" to="orphanage/create">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanageMap;
