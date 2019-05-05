const blogViewOverlay = $('.blogview-overlay');

const open = (destination) => {
    renderBlogTitle(destination.name)
    renderImages(destination.images);
    renderDescription(destination.description);
    blogViewOverlay.style.display = 'block';
};

const close = () => {
    blogViewOverlay.style.display = 'none';
    let imageContainer = $('.image-container');

    while (imageContainer.hasChildNodes()) {
        imageContainer.removeChild(imageContainer.firstChild);
    };

};

const renderBlogTitle = (name) => {
    const blogTitle = $('.blog-title');
    blogTitle.textContent = name;
};

const renderImages = (images) => {
    if (images) {
        for (let i = 0; i < images.length; i++) {
            const imageContainer = $('.image-container')
            let imageItem = images[i];
            imageItem = createElement('img')
            imageItem.className = 'blog-image-item'
            imageItem.src = images[i];
            imageContainer.appendChild(imageItem);
        };
    };
};

const renderDescription = (description) => {
    const blogContent = $('.blog-content');
    blogContent.textContent = description;
};

app.blogView = {
    open,
    close,
    renderBlogTitle,
    renderImages,
    renderDescription
};