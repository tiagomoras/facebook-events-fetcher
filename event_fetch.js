function FetchEvent() {

    var Event_url = $("#fetch_event").val(),
              accessToken = "CAACEdEose0cBAHIN2f3NgZBdgFHHfQLQWnPKZBP0fqXWcmjmbtHunvXKdpsLHBIBDbd2wAe6AOOLOmhPZAZB5Br1IpFiKiYrAdLs2zZBSBTQMW73BMV1lDOcAUMgDvAck9sQmtBpl0Cs2czJjYRexFXoiASO3pHGN6XJIV8l6wEYkQegW1FtJIJNeZB2CZA9EBST5aRmLwLyQZDZD",
              regex = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com|fb.com\/\w+\/\d+/g;

    // Checks if it is a valid facebook event page
    if(Event_url.match(regex))
    {

      var EventID = Event_url.replace(/\w+.+\/(\d+).+/, "$1");

      //console.log("Event ID: " + EventID);
      //console.log("Event Url: " + Event_url);

      var fbUrl = "https://graph.facebook.com/" + EventID + "?access_token=" + accessToken,
        fbCover = "https://graph.facebook.com/" + EventID + "/?fields=cover&access_token=" + accessToken,
        FbTicketUrl = "https://graph.facebook.com/" + EventID + "/?fields=ticket_uri&access_token=" + accessToken;

      function getTicketUrl()
      {
        $.ajax({
          url: FbTicketUrl,
          method: 'GET',
          dataType: "json",
          success: function(data)
          {
            ticket_url = data.ticket_uri;

            if(ticket_url)
            {
              $("#ticket").val(ticket_url);
            }
            else
            {
              console.log("no ticket url available");
            }
          },
          error: function(status)
          {
            console.log("Can't Display Ticket url <br> Error: " + status);
          }
        });
      }

      function getCoverImage()
      {
        $.ajax({
          url: fbCover,
          method: 'GET',
          dataType: "json",
          success: function(data)
          {
            cover = data.cover;

            if(cover.source)
            {
              $("#cover_img").attr("src", cover.source);
            }
            else
            {
              console.log("no Flyer available");
            }
          },
          error: function(status)
          {
            console.log("Cannot Retrieve Image <br> Error: " + status);
          }
        });
      }

      // Main fetch
      $.ajax({
          url: fbUrl,
          method: 'GET',
          dataType: "json",
          success: function(data)
          {

            console.dir(data);

            _.each(_.keys(data), function(field) {

              $field = $("[data-field='" + field + "']");

              if(data[field] !== null){
                $field.val(data[field]);
              } else {
                console.log(field + " not available");
              }

            });

            //Image Display
            getCoverImage();

            // Get tickets url
            getTicketUrl();

          },
          error: function(status) {

            console.log("Error: " + status);

            $("#fetch_event").addClass('error');

            $(".error-tip .text").text("Error occurred, please try again.");

            // Display error message
            $(".error-tip").fadeIn("slow");
            setTimeout(function(){
              $(".error-tip").fadeOut("slow");
            }, 5000);
          }
      });
    }
    else
    {
        console.log("Please Enter a valid Facebook event URL");

        $("#fetch_event").addClass('error');

        $(".error-tip .text").text("Please Enter a valid Facebook event URL");

        // Display error message
        $(".error-tip").fadeIn("slow");
        setTimeout(function(){
          $(".error-tip").fadeOut("slow");
        }, 5000);
    }
  }