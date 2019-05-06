function emptyDishwasher(cupboardNumber)
{
    return new Promise(function(resolve, reject){
        setTimeout(() =>{
            resolve(100);
        }, 2000);
    });
}

function fillDishwasher(dishCount)
{
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            resolve(105);
        }, 1500);
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

(async function(){
    await emptyDishwasher(1);
    await fillDishwasher(12);
    await cleanAppliances("Meister Proper");
    await bringOutTrash(2);
    await cleanOven(false);
    await relaxAndDrinkABear();
    collapse();

})();