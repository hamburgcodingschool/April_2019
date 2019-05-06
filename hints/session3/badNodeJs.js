function emptyDishwasher(cupboardNumber, callback)
{
    setTimeout(callback, 2000);
}

function fillDishwasher(dishCount, callback)
{
    setTimeout(callback, 1500);
}

function cleanAppliances(soapToUse, callback)
{
    setTimeout(callback, 3000);
}

function bringOutTrash(bagsOfTrash, callback)
{
    setTimeout(callback, 5000);
}

function cleanOven(isHot, callback)
{
    setTimeout(callback, 20000);
}

function relaxAndDrinkABear(callback)
{
    setTimeout(callback, 6000);
}

function collapse()
{
    process.exit();
}

emptyDishwasher(1, () => {
    fillDishwasher(12, () => {
        cleanAppliances("Meister Proper", () => {
            bringOutTrash(2, () => {
                cleanOven(false, () => {
                    relaxAndDrinkABear(collapse);
                });
            });
        });
    });
});

