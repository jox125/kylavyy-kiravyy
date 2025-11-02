// --- Kaart ---
const map = L.map('map').setView([57.84, 26.99], 9);

// Maa-ameti aluskaart
L.tileLayer('https://tiles.maaamet.ee/tm/tms/1.0.0/kaart@GMC/{z}/{x}/{y}.png', {
  tms: true,
  maxZoom: 19,
  attribution: '© Maa-amet'
}).addTo(map);

// --- "Leia lähedal" ---
document.getElementById('nearbyBtn').onclick = () => {
  map.locate({ setView: true, maxZoom: 13 });
};
map.on('locationfound', (e) => {
  L.marker(e.latlng).addTo(map).bindPopup("Sina oled siin").openPopup();
  L.circle(e.latlng, { radius: 20000 }).addTo(map);
});

// ---------------------------------------------------------------------
// MARSRUUT: LRM (ilma language: 'et', et viga ei tekiks)
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
    const label = (i === 0) ? 'Algus' : (i === nWps - 1) ? 'Lõpp' : `Stop ${i}`;
    return L.marker(wp.latLng, { draggable: true }).bindPopup(label, { closeButton: false });
  }
}).addTo(map);

routingControl.on('routesfound', (e) => {
  const r = e.routes?.[0];
  if (!r) return;
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
    ? 'Marsruudi režiim: AKTIIVNE (kliki kaardile)'
    : 'Loo marsruut (kliki kaardile)';
});
clearRouteBtn.addEventListener('click', () => {
  routingControl.setWaypoints([]);
  routeMode = false;
  routeModeBtn.classList.add('primary');
  routeModeBtn.textContent = 'Loo marsruut (kliki kaardile)';
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
// HUVIPUNKTID (demo): kategooriad + tagid + filtrid + klastrid
// ---------------------------------------------------------------------

/**
 * Kategooriad:
 * - 'ajalugu' (muuseumid, pärand)
 * - 'loodus' (mäed, järved, matkarajad)
 * - 'kultuur' (seto/õhtu/käsitöö)
 * - 'pere' (lastega sobiv)
 * - 'toit' (kohalik söök/jook)
 */
const poiData = [
  { name: "Võrumaa muuseum", coords: [57.8427, 27.0068], desc: "Kohalik ajalugu ja kultuur.", category: "ajalugu", tags: ["muuseum","linn"] },
  { name: "Suur Munamägi", coords: [57.7262, 27.0589], desc: "Eesti kõrgeim tipp, vaateplatvorm.", category: "loodus", tags: ["vaade","torn"] },
  { name: "Seto Talumuuseum", coords: [57.8791, 27.5027], desc: "Setomaa traditsiooniline elu.", category: "ajalugu", tags: ["seto","muuseum"] },
  { name: "Rouge Pesapuu vaatetorn", coords: [57.7339, 26.9054], desc: "Arhitektuurne torn ja vaated.", category: "loodus", tags: ["vaade"] },
  { name: "Haanja looduskaitseala", coords: [57.733, 27.042], desc: "Kupliline maastik, matkarajad.", category: "loodus", tags: ["matk","park"] },
  { name: "Obinitsa muuseum", coords: [57.8916, 27.5248], desc: "Seto kultuuripärand.", category: "kultuur", tags: ["seto","pärimuskultuur"] },
  { name: "Värska kuurort", coords: [57.9537, 27.6303], desc: "Mineraalvesi ja spa.", category: "pere", tags: ["SPA","lõõgastus"] },
  { name: "Mooska suitsusaun", coords: [57.7382, 26.8296], desc: "Suitsusaunakombestik (UNESCO).", category: "kultuur", tags: ["saun","UNESCO"] },
  { name: "Drumlinite vaatepunkt", coords: [57.7735, 26.9885], desc: "Võrumaa kuppelmaastik.", category: "loodus", tags: ["vaade","geo"] },
  { name: "Navitrolla galerii (Vastseliina)", coords: [57.7278, 27.2916], desc: "Kohalik kunst.", category: "kultuur", tags: ["kunst","galerii"] },
  { name: "Vastseliina piiskopilinnuse varemed", coords: [57.7297, 27.3208], desc: "Keskaegne linnus.", category: "ajalugu", tags: ["linnus","varemed"] },
  { name: "Rõuge Ööbikuorg", coords: [57.7312, 26.9078], desc: "Sügav org, jalutusrajad.", category: "loodus", tags: ["org","matk"] },
  { name: "Seto Kostipäev (sündmuspaik)", coords: [57.884, 27.53], desc: "Trad. toidufestival (hooajaline).", category: "kultuur", tags: ["sündmus","toit"], seasonal: true },
  { name: "Võru linna promenaad", coords: [57.8449, 27.0087], desc: "Järveäärne jalutusala.", category: "pere", tags: ["jalutus","järv"] },
  { name: "Kohalik suitsukalapood", coords: [57.95, 27.2], desc: "Kohalik toit ja suitsukala.", category: "toit", tags: ["kala","kohalik"] },
  { name: "Kultuurimaja (kontserdid)", coords: [57.85, 27.01], desc: "Õhtused sündmused.", category: "kultuur", tags: ["kontsert","sündmus"] },
];

// Kategooriad -> klastrikihid
const categories = [...new Set(poiData.map(p => p.category))];
const layerGroups = {};
const markersByCategory = {};
categories.forEach(cat => {
  layerGroups[cat] = L.markerClusterGroup({ disableClusteringAtZoom: 15 });
  markersByCategory[cat] = [];
});

// Loo markerid, ÄRÄ lisa veel kaardile (algul peidetud)
poiData.forEach(p => {
  const m = L.marker(p.coords).bindPopup(popupHtml(p));
  // Lisa “Lisa peatus marsruudile” nupp
  m.on('popupopen', () => {
    const btn = document.getElementById('add-stop-btn');
    if (btn) btn.onclick = () => addStopToRoute(p.coords);
  });
  markersByCategory[p.category].push(m);
});

// Abi: popup HTML
function popupHtml(p) {
  const tagList = p.tags?.length ? `<div class="badge">${p.tags.join('</div><div class="badge">')}</div>` : '';
  const season = p.seasonal ? `<div class="badge">hooajaline</div>` : '';
  return `
    <b>${p.name}</b><br/>
    ${p.desc}<br/>
    <div style="margin:6px 0">${tagList}${season}</div>
    <button id="add-stop-btn" style="
      margin-top:6px;padding:6px 10px;border:1px solid #d3d3d3;border-radius:8px;background:#f7f7f7;cursor:pointer;">
      Lisa peatus marsruudile
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

// Loo checkbox’id + loendurid
categories.forEach(cat => {
  const count = markersByCategory[cat].length;
  const id = `filter-${cat}`;
  const label = document.createElement('label');
  label.innerHTML = `
    <input type="checkbox" id="${id}" data-cat="${cat}" />
    <span>${prettyCat(cat)}</span>
    <small>${count}</small>
  `;
  filtersDiv.appendChild(label);

  // Käitumine: lisab/eemaldab kihi kaardilt
  label.querySelector('input').addEventListener('change', (ev) => {
    const c = ev.target.dataset.cat;
    const checked = ev.target.checked;
    if (checked) {
      // lisa markerid kihti (kui mitte veel lisatud)
      if (layerGroups[c].getLayers().length === 0) {
        markersByCategory[c].forEach(m => layerGroups[c].addLayer(m));
      }
      map.addLayer(layerGroups[c]);
    } else {
      map.removeLayer(layerGroups[c]);
    }
  });
});

// “Näita kõiki / Peida kõik”
toggleAllBtn.addEventListener('click', () => {
  const state = toggleAllBtn.getAttribute('data-state'); // off -> peidus
  const inputs = filtersDiv.querySelectorAll('input[type="checkbox"]');

  if (state === 'off') {
    // Näita kõiki
    inputs.forEach(inp => {
      if (!inp.checked) inp.checked = true;
      const c = inp.dataset.cat;
      if (layerGroups[c].getLayers().length === 0) {
        markersByCategory[c].forEach(m => layerGroups[c].addLayer(m));
      }
      if (!map.hasLayer(layerGroups[c])) map.addLayer(layerGroups[c]);
    });
    toggleAllBtn.textContent = 'Peida kõik';
    toggleAllBtn.setAttribute('data-state', 'on');
  } else {
    // Peida kõik
    inputs.forEach(inp => {
      if (inp.checked) inp.checked = false;
      const c = inp.dataset.cat;
      if (map.hasLayer(layerGroups[c])) map.removeLayer(layerGroups[c]);
    });
    toggleAllBtn.textContent = 'Näita kõiki';
    toggleAllBtn.setAttribute('data-state', 'off');
  }
});

// Inimhõlbus nimi
function prettyCat(cat) {
  switch (cat) {
    case 'ajalugu': return 'Ajalugu & muuseumid';
    case 'loodus':  return 'Loodus & vaated';
    case 'kultuur': return 'Kultuur & sündmused';
    case 'pere':    return 'Pere & lõõgastus';
    case 'toit':    return 'Kohalik toit';
    default: return cat;
  }
}

// --- Vea logi
window.addEventListener('error', (ev) => {
  console.error('JS viga:', ev.message);
});
