const map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  let districtBoundaries;

  // Function to highlight a specific district
  function highlightDistrict() {
    const inputElement = document.getElementById('districtInput');
    const enteredDistrict = inputElement.value.trim();

    // Clear the map if district boundaries are already shown
    if (districtBoundaries) {
      map.removeLayer(districtBoundaries);
    }

    // Load GeoJSON file dynamically
    fetch('india_district.geojson')
      .then(response => response.json())
      .then(data => {
        // Find the specific district and highlight it
        districtBoundaries = L.geoJSON(data, {
          filter: feature => feature.properties.NAME_2 === enteredDistrict,
          style: {
            color: 'blue', // Highlight color
            weight: 3,
            opacity: 1,
            fillOpacity: 0.3
          }
        }).addTo(map);

        // Optionally, zoom to the highlighted district
        map.fitBounds(districtBoundaries.getBounds());
      })
      .catch(error => console.error('Error loading GeoJSON:', error));
  }