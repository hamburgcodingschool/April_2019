firebase.initializeApp({
    apiKey: "AIzaSyDnCfXJ9E3NYatdS2FYqDyN7PJK2hJ17Zw",
    authDomain: "js-for-web-kat.firebaseapp.com",
    projectId: "js-for-web-kat",
    storageBucket: "js-for-web-kat.appspot.com",
});

const postNewDestination = ({
        name,
        continent,
        description,
        position,
        userName,
        images
    }) =>
    app.db.firebase
    .collection('destinations')
    .add({
        name,
        continent,
        description,
        userName,
        images,
        position: new firebase.firestore.GeoPoint(position.latitude, position.longitude)
    })
    .then(docRef => docRef.get())
    .then(mapFirebaseToGoogle)
    .catch(err => console.log(err));

/**
 * Transforms firebase document instance to google position object
 * @param {firebaseDoc} doc
 */
const mapFirebaseToGoogle = doc => {
    const { id } = doc;
    const { position, ...rest } = doc.data();

    return {
        ...rest,
        id,
        position: {
            lat: position.latitude,
            lng: position.longitude
        }
    };
};

const uploadImages = (files) => {
    const storageRef = firebase.storage().ref();
    const promises = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageRef = storageRef.child(`images/${file.name}`);
        promises.push(imageRef.put(file).then(() => {
            return imageRef.getDownloadURL()
        }));
    }
    return Promise.all(promises)
};

const fetchDestinations = () => {
    return app.db.firebase
        .collection('destinations')
        .get()
        .then(querySnapshot => {
            return querySnapshot.docs.map(app.db.mapFirebaseToGoogle);
        })
        .catch(err => console.error(err));
};

const updateDestination = ({ name, continent, description, position }, id) => {
    return app.db.firebase.collection('destinations').doc(id)
        .update({ name, continent, description, position })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
};

const deleteDestination = (id) => {
    return app.db.firebase.collection('destinations').doc(id)
        .delete()
        .then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
};

const fetchDestinationsByUser = (userName) => {
    return app.db.firebase
        .collection('destinations')
        .where('userName', '==', userName)
        .get()
        .then(querySnapshot => {
            return querySnapshot.docs.map(app.db.mapFirebaseToGoogle);
        })
        .then(destinations => destinations.forEach(app.addDestinationToMap))
        .catch(err => console.error(err));
};

app.db = {
    firebase: firebase.firestore(),
    fetchDestinations,
    mapFirebaseToGoogle,
    postNewDestination,
    updateDestination,
    deleteDestination,
    fetchDestinationsByUser,
    uploadImages
};