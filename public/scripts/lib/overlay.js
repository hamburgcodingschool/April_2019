const closeModal = () => {
    const AddDestinationButton = $('.add-destination-button');
    AddDestinationButton.disabled = false;

    app.overlay.$modal.style.display = "none";
    emptyForm();
};

const prefilledForm = destination => {
    const { position, name, description, continent, id } = destination;
    if (id) $(".id").value = id;
    if (name) $(".name").value = name;
    if (description) $(".description").value = description;
    if (continent) $(".continent").value = continent;
    if (position) {
        $(".latitude").value = position.lat;
        $(".longitude").value = position.lng;
    };
};

const emptyForm = () => {
    $(".id").value = "";
    $(".name").value = "";
    $(".description").value = "";
    $(".continent").value = "";
    $(".latitude").value = "";
    $(".longitude").value = "";
};

const openAddDestinationForm = (destination = {}) => {
    app.overlay.$modal.style.display = "flex";
    const AddDestinationButton = $('.add-destination-button');
    AddDestinationButton.disabled = true;
    prefilledForm(destination);

    const closeButton = $('.close-button');
    closeButton.addEventListener("click", app.overlay.closeModal);

    const saveButton = $('.save-button');
    saveButton.textContent = 'Save';
    $('.save-button').addEventListener('click', app.overlay.onSaveButtonClick);
};

const onSaveButtonClick = () => {
    const saveButton = $('.save-button');
    const modalBox = $(".modal-content");
    const id = $(".id").value;
    const name = $("#name-input", modalBox).value;
    const continent = $("#continent-input", modalBox).value;
    const description = $("#description-input", modalBox).value;
    const latitude = parseFloat($("#latitude-input", modalBox).value);
    const longitude = parseFloat($("#longitude-input", modalBox).value);
    const position = { latitude, longitude };

    const imageInput = $('#image-input');
    const imageFiles = imageInput.files;
    saveButton.textContent = 'Loading ...';
    saveButton.disabled = true;
    app.uploadImages(imageFiles).then((downloadUrls) => {
        console.log('downloadUrls>', downloadUrls);
        const dataToSave = {
            id,
            name,
            continent,
            description,
            position,
            userName: app.userName,
            images: downloadUrls
        };
        if (id) {
            app.updateDestination(dataToSave, id)
        } else {
            app.addDestination(dataToSave)
        };
    });

    const AddDestinationButton = $('.add-destination-button');
    AddDestinationButton.disabled = false;
    saveButton.disabled = false;
};


app.overlay = {
    $modal: $(".modal"),
    openAddDestinationForm,
    closeModal,
    prefilledForm,
    onSaveButtonClick
};