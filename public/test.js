(function(){
    $.ajax({
        url: "http://127.0.0.1:3000/api/marker"
    })
        .done(function( data ) {
            debugger;
        });
})();