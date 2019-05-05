const $ = (selector, parent = document) => {
    return parent.querySelector(selector);
};

const createElement = (elementType, options) => {
    const element = document.createElement(elementType);

    if (options) {
        Object.keys(options).forEach(key => {
            element[key] = options[key];
        });
    }

    return element;
};