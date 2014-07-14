var HandleData = {

  checkUrlValue: function(){
    if($("#fetcher").val()) {
      HandleData.checkValidUrl();
    } else{
      console.log("You need to insert an url.");
    }
  },

  checkValidUrl: function(){
    var EventUrl = $("#fetcher").val(),
       accessToken = "CAACEdEose0cBALKkkDss0JGiQUXvEyPWl3ogamHE35oG6vxtN2sZAn6JBuZBpGBb2WkT9KxDCkkEgDPmN5oMtwlZBX8E2C4R6XZAqJ3gOQS9gV2nswXyPBl6ECZAFMyRMgwcu8YoVimbkD2PF9qisJrLUqHvBy94Vy1GfrQMIj9it0llzUvilmLk0VukZAuf9j7SdpjtuL7QZDZD",
       regex = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com|fb.com\/\w+\/\d+/g;

    // Checks if it is a valid facebook event page
    if(EventUrl.match(regex)){

      var EventID = EventUrl.replace(/\w+.+\/(\d+).+/, "$1"),
          url = "https://graph.facebook.com/" + EventID + "?access_token=" + accessToken;

      var extraInfo = ["ticket_uri", "cover"];

      for(var i = 0; i < extraInfo.length; i++){

        var option = extraInfo[i],
            extraInfoUrl = "https://graph.facebook.com/" + EventID + "/?fields=" + option + "&access_token=" + accessToken;

        // fetch extra data
        HandleData.fetchExtraData(extraInfoUrl);

      }

      // fetch data
      HandleData.fetchMainData(url);

    } else {
      console.log("Please enter a valid fb url!!!");
    }
  },

  fetchMainData: function(url){
    Fetcher.getMainData(url, function(data){
      if(data){
        return HandleData.displayData(data);
      } else{
        console.log("Can't fetch data.");
      }
    });
  },

  fetchExtraData: function(extraInfoUrl){
    Fetcher.getExtraData(extraInfoUrl, function(data){
      if(data){
        return HandleData.displayData(data);
      } else{
        console.log("Can't fetch data.");
      }
    });
  },

  displayData: function(data){
    _.each(_.keys(data), function(field) {

      $field = $("[data-field='" + field + "']");

      if(data[field] !== null){
        if(field == "cover"){
          cover = data.cover;
          $("#cover_img").attr("src", cover.source);
        } else {
          $field.val(data[field]);
        }
      } else {
        console.log(field + " not available");
      }

    });
  }

};