(function(){
    //jquery
    $.ajax({
        url: "http://127.0.0.1:3000/api/destination"
    })
        .done(function( data ) {
           console.log(data);
        });

    //axios
    axios.get("http://127.0.0.1:3000/api/destination")
        .then(function (response) {
            // handle success
            console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
})();