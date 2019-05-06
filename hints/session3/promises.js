function emptyDishwasher(cupboardNumber)
{
    return new Promise(function(resolve, reject){
        setTimeout(resolve, 2000);
    });
}

function fillDishwasher(dishCount)
{
    return new Promise(function(resolve, reject){
        setTimeout(resolve, 1500);
    });
}

function cleanAppliances(soapToUse)
{
    return new Promise(function(resolve, reject){
        setTimeout(resolve, 3000);
    });
}

function bringOutTrash(bagsOfTrash)
{
    return new Promise(function(resolve, reject){
        setTimeout(resolve, 5000);
    });
}

function cleanOven(isHot)
{
    return new Promise(function(resolve, reject){
        setTimeout(resolve, 20000);
    });
}

function relaxAndDrinkABear()
{
    return new Promise(function(resolve, reject){
        setTimeout(resolve, 6000);
    });
}

function collapse()
{
    process.exit();
}
//mention async
Promise.all(
    [
        emptyDishwasher(1),
        fillDishwasher(12),
        cleanAppliances("Meister Proper"),
        bringOutTrash(2),
        cleanOven(false),
        relaxAndDrinkABear()
    ],
    collapse
);