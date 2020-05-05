// stupid hack so that leaflet's images work after going through webpack
import L from "leaflet";
// @ts-ignore
import marker from "leaflet/dist/images/marker-icon.png";
// @ts-ignore
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
// @ts-ignore
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
import yellowIcon from "@/assets/map/yellow-marker.png";
// @ts-ignore
import redIcon from "@/assets/map/red-marker.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: markerShadow
});

export const YellowMarker = new L.Icon({
  iconUrl: yellowIcon,
  iconRetinaUrl: yellowIcon,
  iconSize: new L.Point(60, 75),
  className: "leaflet-yellow-icon leaflet-div-icon"
});

export const RedMarker = new L.Icon({
  iconUrl: redIcon,
  iconRetinaUrl: redIcon,
  iconSize: new L.Point(60, 75),
  className: "leaflet-red-icon leaflet-div-icon"
});
