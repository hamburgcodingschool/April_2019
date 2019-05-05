const app = {
    userName: '',
    users: [],
    listItems: {}
}

function initApp() {
    app.mapLoaded = true

    firebase.auth().onAuthStateChanged(function(user) {
        app.initListeners()
        if (user) {
            app.userName = user.displayName
            app.removeLogin()
            app.initMap()
        }
    })
}

app.initMap = function() {
    if (app.mapInstance) {
        return
    }
    app.mapInstance = app.map.initMap()

    app.infoWindow = new google.maps.InfoWindow()
    app.showAdminUi()
    app.db.fetchDestinations().then(destinations => {
        setUniqueUsers(destinations)
        app.list.createUserFilter()
        return destinations.forEach(app.addDestinationToMap)
    })
}

const setUniqueUsers = destinations => {
    app.users = destinations.reduce((uniqueNames, item) => {
        if (!uniqueNames.includes(item.userName)) {
            uniqueNames.push(item.userName)
        }
        return uniqueNames
    }, [])
}

app.initListeners = () => {
    $('.login-button').addEventListener('click', app.login)
    $('.close-blog-button').addEventListener('click', app.blogView.close)
}

app.login = () => {
    app.auth.login().then(() => {
        app.removeLogin()
        app.initMap()
        app.showAdminUi()
    })
}

app.removeLogin = () => {
    $('.login-overlay').style.display = 'none'
}

app.showAdminUi = () => {
    $('.login-button').style.display = 'none'

    const $destinationButton = $('.add-destination-button')
    $destinationButton.style.display = 'block'

    $destinationButton.addEventListener('click', () => app.overlay.openAddDestinationForm())
}

app.logoutListener = () => {
    $('.logout-button').addEventListener('click', app.logout)
}

app.removeAdminUi = () => {
    $('.add-destination-button').style.display = 'none'
    $('.login-overlay').style.display = 'flex'
    $('.login-button').style.display = 'flex'
}

app.logout = () => {
    app.auth.logout().then(() => {
        app.removeAdminUi()
    })
}

app.logoutListener()

app.addDestination = data => {
    app.db.postNewDestination(data).then(destination => {
        app.overlay.closeModal()
        app.addDestinationToMap(destination)
    })
}

//uploadImages returns a promise
app.uploadImages = imageFiles => app.db.uploadImages(imageFiles)

app.addDestinationToMap = destination => {
    const marker = app.map.createMarker(destination.position)
    app.map.addMarkerEvents(marker, destination)

    const listItem = app.list.createListItem(destination)
    listItem.addEventListener('click', () => listClickEventHandler(marker, destination))

    app.list.$destinationsList.appendChild(listItem)
    app.listItems[destination.id] = listItem
}

app.updateDestination = (data, id) => {
    app.db
        .updateDestination(data, id)
        .then(app.map.clearMarkers)
        .then(app.list.clearListItems)
        .then(() => {
            app.overlay.closeModal()
            app.db
                .fetchDestinations()
                .then(destinations => destinations.forEach(app.addDestinationToMap))
        })
}

app.deleteDestination = id => {
    app.db
        .deleteDestination(id)
        .then(() => {
            app.list.clearListItems()
            app.map.clearMarkers()
        })
        .then(() => {
            app.db
                .fetchDestinations()
                .then(destinations => destinations.forEach(app.addDestinationToMap))
        })
}

const listClickEventHandler = (marker, destination) => {
    app.map.mapInstance.panTo(destination.position)
    app.map.mapInstance.setZoom(destination.zoom || 8)
    app.infoWindow.setContent(createInfoWindowContent(destination))
    app.infoWindow.open(app.map.mapInstance, marker)
}
