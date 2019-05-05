const createListItem = destination => {
    const itemContainerElement = createElement('li');
    const iconContainer = createElement('div');
    const editIcon = createElement('img');
    const deleteIcon = createElement('img');
    const userNameElement = createElement('div');
    const titleElement = createElement('div');
    const positionElement = createElement('div');

    iconContainer.className = 'icon-container'

    deleteIcon.className = 'delete-icon';
    deleteIcon.src = 'https://firebasestorage.googleapis.com/v0/b/js-for-web-kat.appspot.com/o/deleteIcon.svg?alt=media&token=f9304905-b43d-46df-b745-0702cfb5986b'
    editIcon.className = 'edit-icon';
    editIcon.src = 'https://firebasestorage.googleapis.com/v0/b/js-for-web-kat.appspot.com/o/editIcon.svg?alt=media&token=8260e586-9b84-4fd2-a060-18397f710b4b'

    itemContainerElement.className = 'destination-list-item';
    titleElement.className = 'destination-list-item-title';
    titleElement.textContent = destination.name;
    positionElement.textContent = `${destination.position.lat}, ${
    destination.position.lng
  }`;
    positionElement.className = 'position-list-item';
    userNameElement.textContent = destination.userName;
    userNameElement.className = 'user-name';

    itemContainerElement.appendChild(iconContainer);
    iconContainer.appendChild(editIcon);
    iconContainer.appendChild(deleteIcon);
    itemContainerElement.appendChild(titleElement);
    itemContainerElement.appendChild(positionElement);
    itemContainerElement.appendChild(userNameElement);

    editIcon.addEventListener('click', () =>
        app.overlay.openAddDestinationForm(destination)
    );

    deleteIcon.addEventListener('click', () =>
        app.deleteDestination(destination.id)
    );

    return itemContainerElement;
};

const clearListItems = () => {
    const destinationsList = $('.destinations-list');
    while (destinationsList.hasChildNodes()) {
        destinationsList.removeChild(destinationsList.firstChild);
    };
};

const createUserFilter = () => {
    const userSelect = $('#user-select');
    userSelect.addEventListener('change', (event) => {
        const userFilter = event.target.value;
        app.map.clearMarkers();
        app.list.clearListItems();
        app.db.fetchDestinationsByUser(userFilter)
    });
    app.users.forEach((user) => {
        const userItem = createElement('option');

        userItem.value = user;
        userItem.textContent = user;

        userSelect.appendChild(userItem);
    });
};

app.list = {
    $destinationsList: $('.destinations-list'),
    createListItem,
    clearListItems,
    createUserFilter
};