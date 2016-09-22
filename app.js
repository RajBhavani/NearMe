userSearch = ""
 getSites = function(){


    //Train Station
        $.getJSON("https://api.foursquare.com/v2/venues/search?v=20131016&near="+userSearch+"&intent=browse&radius=10000&categoryId=4bf58dd8d48988d129951735&client_id=1FK5WICU4PWL15FW2MOWLXGFE3IXN5ILH2R1NYLWJ1DCW2ZK&client_secret=BQIULM0LQSCHYXKKEEEF3FRRANDBQQG0ML5KY2214M3XS51A", function(data){
        var myResponse = (data.response);
        console.log(myResponse);
       //TrainAvaliability
        $.getJSON("https://api.foursquare.com/v2/venues/search?v=20131016&near="+userSearch+"&intent=browse&radius=10000&categoryId=4bf58dd8d48988d12a951735&client_id=1FK5WICU4PWL15FW2MOWLXGFE3IXN5ILH2R1NYLWJ1DCW2ZK&client_secret=BQIULM0LQSCHYXKKEEEF3FRRANDBQQG0ML5KY2214M3XS51A", function(train){
        var Response = (train.response);
        console.log(Response);
//Platform
        $.getJSON("https://api.foursquare.com/v2/venues/search?v=20131016&near="+userSearch+"&intent=browse&radius=10000&categoryId=4f4531504b9074f6e4fb0102&client_id=1FK5WICU4PWL15FW2MOWLXGFE3IXN5ILH2R1NYLWJ1DCW2ZK&client_secret=BQIULM0LQSCHYXKKEEEF3FRRANDBQQG0ML5KY2214M3XS51A", function(platform){
        var platformResponse = (platform.response);
        console.log(platformResponse);

      var locations = []
      var centerpoint = myResponse.venues[0].location.lat
      var centerlat = myResponse.venues[0].location.lng
      console.log(centerpoint);
      console.log(centerlat);

      $.each(Response.venues,function(index,value){
        $(".trainBox").append("<h4 style='text-decoration:underline'>"+this.name+"<h4>")
        $(".trainBox").append("<h4>" +this.location.address+ "</h4>");
        locations.push([this.name,this.location.lat,this.location.lng]);
      })

       $.each(myResponse.venues,function(index,value){
        $(".trainstationBox").append("<h4 style='text-decoration:underline'>"+this.name+"<h4>")
        $(".trainstationBox").append("<h4>" +this.location.address+ "</h4>");
            locations.push([this.name,this.location.lat,this.location.lng])
        });
       $.each(PlatformResponse.venues,function(index,value){
        $(".platformBox").append("<h4 style='text-decoration:underline'>"+this.name+"<h4>")
        $(".platformBox").append("<h4>" +this.location.address+ "</h4>");
        locations.push([this.name,this.location.lat,this.location.lng])
       })
        console.log(locations);

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: new google.maps.LatLng(centerpoint,centerlat),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) { 
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
    });
});
    });
    };

$(document).ready(function() {
    $("#citysearch").click(function(){
        userSearch = $("#placesearch").val();
        if ($(".trainBox:has(h4)")) {
            $("h4").html("");
            getSites()
        }
        else {
            getSites();
        }

        //getSites()

       
  });
});


   
