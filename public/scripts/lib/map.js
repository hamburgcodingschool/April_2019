// const getDb = require('./utils/database').getDb
const markers = []

const createInfoWindowContent = destination => {
  const infoWindowContainer = createElement('div')
  const name = createElement('p')
  const continent = createElement('p')
  const readMoreLink = createElement('a')
  if (destination.images) {
    const image = createElement('img')
    image.className = 'infowindow-image'
    image.src = destination.images[0]
    infoWindowContainer.appendChild(image)
  }
  name.textContent = destination.name
  name.className = 'infowindow-text'
  continent.textContent = destination.continent
  continent.className = 'infowindow-continent'
  readMoreLink.className = 'read-more-link'
  readMoreLink.textContent = 'read more »'
  readMoreLink.href = '#'

  infoWindowContainer.appendChild(name)
  infoWindowContainer.appendChild(continent)
  infoWindowContainer.appendChild(readMoreLink)

  readMoreLink.addEventListener('click', () => onClickReadMore(destination))

  return infoWindowContainer
}

const createMarker = position => {
  const marker = new google.maps.Marker({
    map: app.map.mapInstance,
    position
  })
  markers.push(marker)
  //   const db = getDb()
  //   db.collection('markers').insertOne(marker)
  return marker
}

const clearMarkers = () => {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null)
  }
}

const initMap = () => {
  app.map.mapInstance = new google.maps.Map($('.map'), {
    center: { lat: 07, lng: 0 },
    zoom: 2
  })

  app.map.initListeners()

  return app.map.mapInstance
}

const initListeners = () => {
  app.map.mapInstance.addListener('click', () => app.infoWindow.close())

  app.map.mapInstance.addListener('click', event => onMapClick(event))
}

const onMapClick = event => {
  const position = event.latLng.toJSON()
  const latitudeInput = document.querySelector('.latitude')
  if (latitudeInput) {
    latitudeInput.value = position.lat
  }
  const longitudeInput = document.querySelector('.longitude')
  if (longitudeInput) {
    longitudeInput.value = position.lng
  }
}

const addMarkerEvents = (marker, destination) => {
  marker.addListener('click', () => {
    app.infoWindow.setContent(createInfoWindowContent(destination))
    app.infoWindow.open(app.map.mapInstance, marker)
  })
}

const onClickReadMore = destination => {
  app.blogView.open(destination)
}

app.map = {
  onMapClick,
  addMarkerEvents,
  initListeners,
  initMap,
  createMarker,
  createInfoWindowContent,
  markers,
  clearMarkers
}
