// stupid hack so that leaflet's images work after going through webpack
import L from "leaflet";

import "leaflet/dist/leaflet.css";

// @ts-ignore
import marker from "leaflet/dist/images/marker-icon.png";
// @ts-ignore
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
// @ts-ignore
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: markerShadow
});
