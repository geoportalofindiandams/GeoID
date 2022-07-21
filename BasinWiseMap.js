function setInitialMapZoom() {
    var viewportWidth = window.innerWidth;
    var mapZoom;
    if (viewportWidth < [768]) {
     mapZoom = [4];
    }else {
     mapZoom = [5];
    }
    return mapZoom;
}

var lat = 22.9074872;
var lng = 79.07306671;
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    		subdomains:['mt0','mt1','mt2','mt3']
});
var map = L.map('map', {
    layers: [googleStreets],
    tap: false, 
    center: new L.LatLng(lat, lng),
    zoom: setInitialMapZoom(),
    fullscreenControl: true,
    fullscreenControlOptions: { // optional
        title:"Show me the fullscreen !",
        titleCancel:"Exit fullscreen mode"
    }
});

let AllDams = [];  
// Fill the first dropdown with data.
$.getJSON('Dams.json', function (DamItem) {
    let DamList = [];
    $.each(DamItem, function (index, value) {
        DamList.push(value.RiverBasin);
        AllDams = DamItem;
    });
    // Remove duplicates. We want unique RiverBasin Name
    DamList = Array.from(new Set (DamList));

    // Fill the first dropdown with unique RiverBasin
    $.each(DamList, function (index, value) {
        $('#select-basin').append('<option value="' + value + '">' + value + '</option>');
    });
});
$('#select-basin').change(function () {
    let RiverBasinName = this.options[this.selectedIndex].value;
    let filterData = AllDams.filter(function(value) {
        return value.RiverBasin === RiverBasinName;
    });
    $('#select-dam')
        .empty()
        .append('<li value=""></li>');
        function generateList() {
            let ul = document.querySelector('.list');
            $.each(filterData, function (index, value) {
              const li = document.createElement('li');
              const div = document.createElement('div');
              const a = document.createElement('a');
              const p = document.createElement('p');
              a.addEventListener('click', () => { flyToDam(filterData);  });

                // Fly to popup
                function flyToDam(filterdata) {
                    const lat = value.Latitude;
                    const lng = value.Longitude;
                    map.flyTo([lat, lng], 14, {
                        duration: 3
                    });
                    setTimeout(() => {
                        L.popup({closeButton: false, offset: L.point(0, -5)})
                        .setLatLng([lat, lng])
                        .setContent(makePopupContent(filterData))
                        .openOn(map);
                    }, 3000);
                }

                // Add Popup
                function makePopupContent(filterData) {
                    return `
                      <div>
                          <h4>${value.Name}</h4>
                          <p> <strong>Address:</strong> ${value.Address}</p>
                          <p><strong>Coordinates: </strong>${value.Latitude}, ${value.Longitude} </p>
                          <p><strong>Height Above Lowest Foundation Level: </strong>${value.HaLF} m </p>
                          <p><strong>Dam Length:</strong> ${value.DamLength} m </p>
                          <p><strong>Reservoir Area:</strong> ${value.ReservoirArea}  m<sup>2</sup> </p>
                          <p><strong>Gross Storage Capacity:</strong> ${value.GrossStorageCapacity}  m<sup>3</sup> </p>
                          <p><strong>Effective Storage Capacity:</strong> ${value.EffectiveStorageCapacity}  m<sup>3</sup> </p>
                          <div class="read-more">
                              <a href="${value.ReadMore}" target="_blank">Read More </a>
                          </div>
                      </div>
                    `;
                }
                  
                // Add Marker  and Popup
                var myIcon = L.icon({
                    iconUrl: 'Images/marker-icon.png',
                    iconSize:     [15], 
                    popupAnchor:  [0, -5] 
                });
                var marker = L.marker([value.Latitude, value.Longitude],{icon: myIcon})
                marker.bindPopup(makePopupContent, { closeButton: false }).openPopup();
                marker.addTo(map);

                // To Remove Previous layer
                $( document ).ready(function() {
                    $("#select-basin").click(function(){
                        map.removeLayer(marker);
                    })
                })

                // Listing
                div.classList.add('dam-item');
                a.innerText = value.Name;
                a.href ='#';
                p.innerText = value.Address;
                
                div.appendChild(a);
                div.appendChild(p);
                li.appendChild(div);
                ul.appendChild(li);

            });    
        }generateList();
});

// Add All River Basin
var AllRiverBasin = L.geoJSON(AllRiverBasin, {color: 'black'})
AllRiverBasin.addTo(map);

// map coordinate function
map.on('mousemove', function(e){
    $('.coordinate').html(`Lat: ${e.latlng.lat.toFixed(3)} Lng: ${e.latlng.lng.toFixed(3)}`)
})

// map scale
L.control.scale({position: 'bottomright'}).addTo(map);

// topo map layer start
var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png');
OpenTopoMap.addTo(map);

// Google Hybrid map layer
googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    subdomains:['mt0','mt1','mt2','mt3']
});
googleHybrid.addTo(map);

// Google Satellite map layer
googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    subdomains:['mt0','mt1','mt2','mt3']
});
googleSat.addTo(map);

// layer control
var baseLayers = {
   " Google Map":googleStreets,
    "Topography Map": OpenTopoMap,
    "Hybrid Map": googleHybrid,
    "Satellite Map": googleSat,
};
var overlays = {
    "River Basin Boundaries": AllRiverBasin,
};
L.control.layers(baseLayers, overlays).addTo(map);

// Search Bar
L.Control.geocoder().addTo(map);

// Search Feature
const search = document.getElementById('search');
const matchList = document.getElementById('select-dam');

const DamItem= async searchText => {
  const AllDamList = await fetch('Dams.json');
  const Dams = await AllDamList.json();

  let matches = Dams.filter(Dam => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return Dam.Name.match(regex);
  });

  if(searchText.length==0){
    matches =[];
    matchList.innerHTML = '';
  }

  outputHtml(matches);
};
const outputHtml = matches => {
  if(matches.length > 0) {
    const html = matches.map(match => ` 
        <div class ="dam-item">
            <a href="#">${match.Name}, </a>
            <p>${match.Address} </p>
        </div>
    `
      )
      .join('');
    matchList.innerHTML = html;
  }
  
}
search.addEventListener('input', ()=>DamItem(search.value));
















