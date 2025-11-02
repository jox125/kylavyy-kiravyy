// --------- Kakskeelsus ---------
const translations = {
  et: {
    routeCreate: "Loo marsruut (kliki kaardile)",
    routeActive: "Marsruudi režiim: AKTIIVNE (kliki kaardile)",
    routeClear: "Tühjenda marsruut",
    nearby: "Leia lähedal",
    youAreHere: "Sina oled siin",
    filterTitle: "Huvipunktid",
    showAll: "Näita kõiki",
    hideAll: "Peida kõik",
    addStop: "Lisa peatus marsruudile",
    seasonal: "hooajaline",
    startLabel: "Algus",
    endLabel: "Lõpp",
    stopLabel: "Peatus",
    alongRoute: "Näita marsruudi läheduses",
    kmSuffix: "km"
  },
  en: {
    routeCreate: "Plan route (click on map)",
    routeActive: "Route mode: ACTIVE (click on map)",
    routeClear: "Clear route",
    nearby: "Find nearby",
    youAreHere: "You are here",
    filterTitle: "Points of Interest",
    showAll: "Show all",
    hideAll: "Hide all",
    addStop: "Add stop to route",
    seasonal: "seasonal",
    startLabel: "Start",
    endLabel: "End",
    stopLabel: "Stop",
    alongRoute: "Show POIs near route",
    kmSuffix: "km"
  }
};


//Demo PIO data (kakskeelne)
const poiData = [
  {
    name_et: "Võrumaa muuseum",
    name_en: "Võru County Museum",
    desc_et: "Kohalik ajalugu ja kultuur.",
    desc_en: "Local history and culture.",
    coords: [57.8427, 27.0068],
    category: "ajalugu",
    tags_et: ["muuseum","linn"],
    tags_en: ["museum","town"]
  },
  {
    name_et: "Suur Munamägi",
    name_en: "Suur Munamägi",
    desc_et: "Eesti kõrgeim tipp, vaateplatvorm.",
    desc_en: "Estonia’s highest peak with a viewing platform.",
    coords: [57.7262, 27.0589],
    category: "loodus",
    tags_et: ["vaade","torn"],
    tags_en: ["view","tower"]
  },
  {
    name_et: "Seto Talumuuseum",
    name_en: "Seto Farm Museum",
    desc_et: "Setomaa traditsiooniline elu.",
    desc_en: "Traditional Setomaa culture and lifestyle.",
    coords: [57.8791, 27.5027],
    category: "ajalugu",
    tags_et: ["seto","muuseum"],
    tags_en: ["seto","museum"]
  },
  {
    name_et: "Rõuge Pesapuu vaatetorn",
    name_en: "Rõuge Pesapuu Observation Tower",
    desc_et: "Arhitektuurne torn ja vaated.",
    desc_en: "Architectural tower with panoramic views.",
    coords: [57.7339, 26.9054],
    category: "loodus",
    tags_et: ["vaade"],
    tags_en: ["view"]
  },
  {
    name_et: "Haanja looduskaitseala",
    name_en: "Haanja Nature Reserve",
    desc_et: "Kupliline maastik, matkarajad.",
    desc_en: "Hummocky landscape and hiking trails.",
    coords: [57.733, 27.042],
    category: "loodus",
    tags_et: ["matk","park"],
    tags_en: ["hiking","park"]
  },
  {
    name_et: "Obinitsa muuseum",
    name_en: "Obinitsa Museum",
    desc_et: "Seto kultuuripärand.",
    desc_en: "Seto cultural heritage.",
    coords: [57.8916, 27.5248],
    category: "kultuur",
    tags_et: ["seto","pärimuskultuur"],
    tags_en: ["seto","heritage"]
  },
  {
    name_et: "Värska kuurort",
    name_en: "Värska Resort",
    desc_et: "Mineraalvesi ja spa.",
    desc_en: "Mineral water and spa.",
    coords: [57.9537, 27.6303],
    category: "pere",
    tags_et: ["SPA","lõõgastus"],
    tags_en: ["spa","relaxation"]
  },
  {
    name_et: "Mooska suitsusaun",
    name_en: "Mooska Smoke Sauna",
    desc_et: "Suitsusaunakombestik (UNESCO).",
    desc_en: "Smoke sauna tradition (UNESCO).",
    coords: [57.7382, 26.8296],
    category: "kultuur",
    tags_et: ["saun","UNESCO"],
    tags_en: ["sauna","UNESCO"]
  },
  {
    name_et: "Drumlinite vaatepunkt",
    name_en: "Drumlins Viewpoint",
    desc_et: "Võrumaa kuppelmaastik.",
    desc_en: "The hummocky landscape of Võru County.",
    coords: [57.7735, 26.9885],
    category: "loodus",
    tags_et: ["vaade","geo"],
    tags_en: ["view","geo"]
  },
  {
    name_et: "Navitrolla galerii (Vastseliina)",
    name_en: "Navitrolla Gallery (Vastseliina)",
    desc_et: "Kohalik kunst.",
    desc_en: "Local art.",
    coords: [57.7278, 27.2916],
    category: "kultuur",
    tags_et: ["kunst","galerii"],
    tags_en: ["art","gallery"]
  },
  {
    name_et: "Vastseliina piiskopilinnuse varemed",
    name_en: "Ruins of Vastseliina Bishop’s Castle",
    desc_et: "Keskaegne linnus.",
    desc_en: "Medieval castle ruins.",
    coords: [57.7297, 27.3208],
    category: "ajalugu",
    tags_et: ["linnus","varemed"],
    tags_en: ["castle","ruins"]
  },
  {
    name_et: "Rõuge Ööbikuorg",
    name_en: "Rõuge Nightingale Valley",
    desc_et: "Sügav org, jalutusrajad.",
    desc_en: "Deep valley with walking trails.",
    coords: [57.7312, 26.9078],
    category: "loodus",
    tags_et: ["org","matk"],
    tags_en: ["valley","hiking"]
  },
  {
    name_et: "Seto Kostipäev (sündmuspaik)",
    name_en: "Seto Food Feast (event venue)",
    desc_et: "Trad. toidufestival (hooajaline).",
    desc_en: "Traditional food festival (seasonal).",
    coords: [57.884, 27.53],
    category: "kultuur",
    tags_et: ["sündmus","toit"],
    tags_en: ["event","food"],
    seasonal: true
  },
  {
    name_et: "Võru linna promenaad",
    name_en: "Võru City Promenade",
    desc_et: "Järveäärne jalutusala.",
    desc_en: "Lakeside promenade.",
    coords: [57.8449, 27.0087],
    category: "pere",
    tags_et: ["jalutus","järv"],
    tags_en: ["walk","lake"]
  },
  {
    name_et: "Kohalik suitsukalapood",
    name_en: "Local Smoked Fish Shop",
    desc_et: "Kohalik toit ja suitsukala.",
    desc_en: "Local food and smoked fish.",
    coords: [57.95, 27.2],
    category: "toit",
    tags_et: ["kala","kohalik"],
    tags_en: ["fish","local"]
  },
  {
    name_et: "Kultuurimaja (kontserdid)",
    name_en: "Cultural Centre (concerts)",
    desc_et: "Õhtused sündmused.",
    desc_en: "Evening events.",
    coords: [57.85, 27.01],
    category: "kultuur",
    tags_et: ["kontsert","sündmus"],
    tags_en: ["concert","event"]
  }
];


let currentLang = localStorage.getItem("appLang") || "et";

let corridorOn = true;        // kas filtreerime marsruudi koridori järgi
let corridorKm = 5;           // lubatud kõrvalepõige (km)
let currentRouteLine = null;  // L.Polyline marsruudist


// --- Kaart ---
const map = L.map('map').setView([57.84, 26.99], 9);

// Maa-ameti aluskaart
L.tileLayer('https://tiles.maaamet.ee/tm/tms/1.0.0/kaart@GMC/{z}/{x}/{y}.png', {
  tms: true,
  maxZoom: 19,
  attribution: '© Maa-amet'
}).addTo(map);

// Keele lüliti
document.getElementById("langToggle").onclick = () => {
  const newLang = currentLang === "et" ? "en" : "et";
  setLanguage(newLang);
};

// --- "Leia lähedal" ---
document.getElementById('nearbyBtn').onclick = () => {
  map.locate({ setView: true, maxZoom: 13 });
};

const corridorToggle = document.getElementById('corridorToggle');
const corridorRange  = document.getElementById('corridorKm');
const corridorVal    = document.getElementById('corridorKmValue');

corridorToggle.addEventListener('change', () => {
  corridorOn = corridorToggle.checked;
  refreshAllCategoryLayers();
});

corridorRange.addEventListener('input', () => {
  corridorKm = Number(corridorRange.value);
  corridorVal.textContent = `${corridorKm} ${translations[currentLang].kmSuffix}`;
  refreshAllCategoryLayers();
});

map.on('locationfound', (e) => {
  L.marker(e.latlng).addTo(map).bindPopup(translations[currentLang].youAreHere).openPopup();
  L.circle(e.latlng, { radius: 20000 }).addTo(map);
});

// Eukleidiline ligikaudne kaugus Leafleti kaardiprojektsioonis (pikslid -> meetrid)
function distancePointToSegmentMeters(p, a, b) {
  // p, a, b on LayerPoint'id (pikslites)
  const atob = b.subtract(a);
  const atop = p.subtract(a);
  const len = atob.x*atob.x + atob.y*atob.y;
  let t = len === 0 ? 0 : (atop.x*atob.x + atop.y*atob.y) / len;
  t = Math.max(0, Math.min(1, t));
  const proj = L.point(a.x + atob.x * t, a.y + atob.y * t);
  const distPx = p.distanceTo(proj);
  // teisenda pikslid meetriteks praegusel zoomil – võtame skaalaks ~metersPerPixel kaardi keskel
  const center = map.getCenter();
  const p1 = map.latLngToLayerPoint(center);
  const p2 = map.latLngToLayerPoint(L.latLng(center.lat, center.lng + 0.001));
  const meters = L.latLng(center).distanceTo(L.latLng(center.lat, center.lng + 0.001));
  const metersPerPixel = meters / p1.distanceTo(p2);
  return distPx * metersPerPixel;
}

function distanceToPolylineMeters(latlng, polyline) {
  if (!polyline) return Infinity;
  const pts = polyline.getLatLngs(); // array of L.LatLng
  if (pts.length < 2) return Infinity;
  const p = map.latLngToLayerPoint(latlng);
  let min = Infinity;
  for (let i = 1; i < pts.length; i++) {
    const a = map.latLngToLayerPoint(pts[i-1]);
    const b = map.latLngToLayerPoint(pts[i]);
    const d = distancePointToSegmentMeters(p, a, b);
    if (d < min) min = d;
  }
  return min;
}

function markerPassesCorridor(m) {
  if (!corridorOn || !currentRouteLine) return true; // kui pole koridori filtrit või marsruuti, näitame kõiki
  const d = distanceToPolylineMeters(m.getLatLng(), currentRouteLine);
  return d <= corridorKm * 1000;
}

function refreshCategoryLayer(cat) {
  // ehita kiht uuesti vastavalt koridorifiltrile
  layerGroups[cat].clearLayers();
  markersByCategory[cat].forEach(m => {
    if (markerPassesCorridor(m)) layerGroups[cat].addLayer(m);
  });
}

function refreshAllCategoryLayers() {
  categories.forEach(cat => {
    if (selectedCategories.has(cat)) {
      refreshCategoryLayer(cat);
      if (!map.hasLayer(layerGroups[cat])) map.addLayer(layerGroups[cat]);
    } else {
      if (map.hasLayer(layerGroups[cat])) map.removeLayer(layerGroups[cat]);
    }
  });
}


// ---------------------------------------------------------------------
// MARSRUUT: LRM (ilma language:'et')
// ---------------------------------------------------------------------
const geocoder = (L.Control && L.Control.Geocoder && L.Control.Geocoder.nominatim)
  ? L.Control.Geocoder.nominatim()
  : null;

const routingControl = L.Routing.control({
  waypoints: [],
  router: L.Routing.osrmv1({ serviceUrl: 'https://router.project-osrm.org/route/v1' }),
  routeWhileDragging: true,
  showAlternatives: true,
  geocoder: geocoder || undefined,
  addWaypoints: true,
  draggableWaypoints: true,
  fitSelectedRoutes: true,
  show: true,
  createMarker: function(i, wp, nWps) {
    const t = translations[currentLang];
    const label = (i === 0) ? t.startLabel : (i === nWps - 1) ? t.endLabel : `${t.stopLabel} ${i}`;
    return L.marker(wp.latLng, { draggable: true }).bindPopup(label, { closeButton: false });
  }
}).addTo(map);

routingControl.on('routesfound', (e) => {
  const r = e.routes?.[0];
  if (!r) { currentRouteLine = null; return; }
  // salvesta polügooniline joon (kasutame kauguse arvutamiseks)
  currentRouteLine = L.polyline(r.coordinates);
  // kui koridorifilter sees, värskenda nähtavaid POI-sid
  if (corridorOn) refreshAllCategoryLayers();
  const km = (r.summary.totalDistance / 1000).toFixed(1);
  const min = Math.round(r.summary.totalTime / 60);
  console.log(`Marsruut: ${km} km, ~${min} min`);
});


let routeMode = false;
const routeModeBtn = document.getElementById('routeModeBtn');
const clearRouteBtn = document.getElementById('clearRouteBtn');

routeModeBtn.addEventListener('click', () => {
  routeMode = !routeMode;
  routeModeBtn.classList.toggle('primary', routeMode);
  routeModeBtn.textContent = routeMode
    ? translations[currentLang].routeActive
    : translations[currentLang].routeCreate;
});

clearRouteBtn.addEventListener('click', () => {
  routingControl.setWaypoints([]);
  currentRouteLine = null; // <— lisatud
  if (corridorOn) refreshAllCategoryLayers();
  routeMode = false;
  routeModeBtn.classList.add('primary');
  routeModeBtn.textContent = translations[currentLang].routeCreate;
});


function currentWaypointsLatLng() {
  return routingControl.getWaypoints().map(wp => wp && wp.latLng).filter(Boolean);
}
map.on('click', (e) => {
  if (!routeMode) return;
  const curr = currentWaypointsLatLng();
  curr.push(e.latlng);
  routingControl.setWaypoints(curr);
});

// ---------------------------------------------------------------------
// HUVIPUNKTID: (kakskeelne) – eeldan, et poiData on defineeritud eraldi failis
// või sama faili ülaosas. Kui see on allpool, tõsta see siia kohale.
// ---------------------------------------------------------------------

// Kategooriad -> klastrikihid
const categories = [...new Set(poiData.map(p => p.category))];
const layerGroups = {};
const markersByCategory = {};
categories.forEach(cat => {
  layerGroups[cat] = L.markerClusterGroup({ disableClusteringAtZoom: 15 });
  markersByCategory[cat] = [];
});

// Loo markerid ÜKS KORD, ära lisa veel kaardile (algul peidetud)
poiData.forEach(p => {
  const m = L.marker(p.coords);
  m._poi = p; // talletame viite, et ei peaks hiljem koordinaate võrdlema
  m.bindPopup(popupHtml(p));
  m.on('popupopen', (e) => {
    const el = e.popup.getElement();
    const btn = el && el.querySelector('.add-stop-btn');
    if (btn) btn.onclick = () => addStopToRoute(p.coords);
  });
  markersByCategory[p.category].push(m);
});

// Keelesõbralik popup
function popupHtml(p) {
  const name = currentLang === "et" ? p.name_et : p.name_en;
  const desc = currentLang === "et" ? p.desc_et : p.desc_en;
  const addStopTxt = translations[currentLang].addStop;
  const tags = (currentLang === "et" ? p.tags_et : p.tags_en) || [];
  const tagList = tags.length ? `<div class="badge">${tags.join('</div><div class="badge">')}</div>` : '';
  const season = p.seasonal ? `<div class="badge">${translations[currentLang].seasonal}</div>` : '';

  return `
    <b>${name}</b><br/>
    ${desc}<br/>
    <div style="margin:6px 0">${tagList}${season}</div>
    <button class="add-stop-btn" style="
      margin-top:6px;padding:6px 10px;border:1px solid #d3d3d3;border-radius:8px;background:#f7f7f7;cursor:pointer;">
      ${addStopTxt}
    </button>
  `;
}

// Lisa peatus LRM-i
function addStopToRoute(latlngArr) {
  const curr = currentWaypointsLatLng();
  curr.push(L.latLng(latlngArr[0], latlngArr[1]));
  routingControl.setWaypoints(curr);
}

// -------- Filtripaneel (checkboxid, loendurid) --------
const filtersDiv = document.getElementById('filters');
const toggleAllBtn = document.getElementById('toggleAllBtn');
// Hetkel sisse lülitatud kategooriad
const selectedCategories = new Set();

function renderFilters() {
  // säilita valikud
  const prev = new Set(selectedCategories);
  selectedCategories.clear();
  prev.forEach(c => selectedCategories.add(c));

  // puhasta ja loo uuesti
  filtersDiv.innerHTML = "";
  categories.forEach(cat => {
    const count = markersByCategory[cat].length;
    const id = `filter-${cat}`;
    const label = document.createElement('label');
    const checked = prev.has(cat);

    label.innerHTML = `
      <input type="checkbox" id="${id}" data-cat="${cat}" ${checked ? "checked" : ""}/>
      <span>${prettyCat(cat)}</span>
      <small>${count}</small>
    `;
    filtersDiv.appendChild(label);

    const input = label.querySelector('input');
    input.addEventListener('change', (ev) => {
      const c = ev.target.dataset.cat;
      const isOn = ev.target.checked;
      if (isOn) {
        selectedCategories.add(c);
        refreshCategoryLayer(c);
        if (!map.hasLayer(layerGroups[c])) map.addLayer(layerGroups[c]);
      } else {
        selectedCategories.delete(c);
        if (map.hasLayer(layerGroups[c])) map.removeLayer(layerGroups[c]);      }

      // uuenda toggleAll teksti
      const allOn = categories.every(k => selectedCategories.has(k));
      toggleAllBtn.textContent = allOn ? translations[currentLang].hideAll : translations[currentLang].showAll;
      toggleAllBtn.setAttribute('data-state', allOn ? 'on' : 'off');
    });

    // kui oli varem valitud, lülita kohe sisse
    if (checked) {
      if (layerGroups[cat].getLayers().length === 0) {
        markersByCategory[cat].forEach(m => layerGroups[cat].addLayer(m));
      }
      if (!map.hasLayer(layerGroups[cat])) map.addLayer(layerGroups[cat]);
    }
  });

  // pealkiri ja toggle nupp
  document.querySelector("#filterPanel .filter-header span").textContent = translations[currentLang].filterTitle;
  const allOn = categories.every(k => selectedCategories.has(k));
  toggleAllBtn.textContent = allOn ? translations[currentLang].hideAll : translations[currentLang].showAll;
  toggleAllBtn.setAttribute('data-state', allOn ? 'on' : 'off');
}

// "Näita kõiki / Peida kõik"
toggleAllBtn.addEventListener('click', () => {
  const turnOn = toggleAllBtn.getAttribute('data-state') === 'off';

  selectedCategories.clear();
  if (turnOn) categories.forEach(c => selectedCategories.add(c));

  // checkboxid + kihid
  filtersDiv.querySelectorAll('input[type="checkbox"]').forEach(inp => {
    inp.checked = turnOn;
    const c = inp.dataset.cat;
    if (turnOn) {
      if (layerGroups[c].getLayers().length === 0) {
        markersByCategory[c].forEach(m => layerGroups[c].addLayer(m));
      }
      if (!map.hasLayer(layerGroups[c])) map.addLayer(layerGroups[c]);
    } else {
      if (map.hasLayer(layerGroups[c])) map.removeLayer(layerGroups[c]);
    }
  });

  toggleAllBtn.textContent = turnOn ? translations[currentLang].hideAll : translations[currentLang].showAll;
  toggleAllBtn.setAttribute('data-state', turnOn ? 'on' : 'off');
});

// Inimhõlbus kategooria nimi
function prettyCat(cat) {
  // Kui sul on eraldi translations.categories, võid kasutada seda.
  // Siin on lihtne fallback: kasuta ET/EN üldpealkirju ülal või jäta cat.
  // (Vajadusel lisa categories-tõlked translations-objekti.)
  // Kuna sa juba näitasid kategooriate tõlkeid eraldi plokis, saate soovi korral laiendada.
  return ({
    et: {
      ajalugu: "Ajalugu & muuseumid",
      loodus:  "Loodus & vaated",
      kultuur: "Kultuur & sündmused",
      pere:    "Pere & lõõgastus",
      toit:    "Kohalik toit"
    },
    en: {
      ajalugu: "History & Museums",
      loodus:  "Nature & Views",
      kultuur: "Culture & Events",
      pere:    "Family & Relax",
      toit:    "Local Food"
    }
  })[currentLang][cat] || cat;
}

// Uuenda kõikide markerite popupid aktiivse keele järgi
function renderPOIMarkers() {
  categories.forEach(cat => {
    markersByCategory[cat].forEach(m => {
      const p = m._poi;
      if (p) m.setPopupContent(popupHtml(p));
    });
  });
}

// --- Vea logi
window.addEventListener('error', (ev) => {
  console.error('JS viga:', ev.message);
});

// Keel ja UI algseis
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("appLang", lang);
  const t = translations[lang];

  document.getElementById("clearRouteBtn").textContent = t.routeClear;
  document.getElementById("nearbyBtn").textContent = t.nearby;

  const rb = document.getElementById("routeModeBtn");
  rb.textContent = routeMode ? t.routeActive : t.routeCreate;

  document.getElementById("langToggle").textContent = lang === "et" ? "EN" : "ET";

  // filtrite pealkiri + toggle
  renderFilters();
  renderPOIMarkers();

  // koridoriploki tekstid
  document.getElementById('corridorLabel').textContent = t.alongRoute;
  corridorVal.textContent = `${corridorKm} ${t.kmSuffix}`;
}


setLanguage(currentLang);
