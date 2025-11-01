const map = L.map('map').setView([57.84, 26.99], 9);

// Maa-ameti aluskaart (halltoon)
L.tileLayer('https://tiles.maaamet.ee/tm/tms/1.0.0/kaart@GMC/{z}/{x}/{y}.png', {
  tms: true,
  maxZoom: 19,
  attribution: '© Maa-amet'
}).addTo(map);

// Näidisandmed
const points = [
  { name: "Võrumaa muuseum", coords: [57.8427, 27.0068], desc: "Kohalik ajalugu ja kultuur." },
  { name: "Suur Munamägi", coords: [57.7262, 27.0589], desc: "Eesti kõrgeim tipp, vaateplatvorm ja torn." },
  { name: "Seto Talumuuseum", coords: [57.8791, 27.5027], desc: "Setomaa traditsiooniline kultuur." }
];

points.forEach(p => {
  L.marker(p.coords)
    .addTo(map)
    .bindPopup(`<b>${p.name}</b><br>${p.desc}<br><button onclick="checkIn('${p.name}')">Check-in</button>`);
});

let score = 0;
function checkIn(place) {
  score++;
  alert(`Külastasid: ${place}\nPunkte kokku: ${score}`);
}

// Leia lähedal asuvad kohad
document.getElementById('nearbyBtn').onclick = () => {
  map.locate({ setView: true, maxZoom: 13 });
};

map.on('locationfound', (e) => {
  const userMarker = L.marker(e.latlng).addTo(map).bindPopup("Sina oled siin").openPopup();
  L.circle(e.latlng, { radius: 20000 }).addTo(map); // 20 km ring
});
