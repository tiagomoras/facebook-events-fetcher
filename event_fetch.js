function fetchEvent() {

    var Event_url = $("#fetch_event").val(),
              accessToken = "CAACEdEose0cBAFxXUNl0KAWqax6pabRbD4ZCOo2VGwoJtKAI9fGYcI1QJUpuuTiizL5peB17DSPIVZC0L7rNBs5TQxPJ2ZANjRS2QLWzmf8SPdqwEP5oSzZChkfLEMayWmDgYbP09RfUterRIwLqJFYbH2gWOAAwNtKYtjyQZBIL3OS7M6AX9g0UEViu1JDLZB7ws86g4uOwZDZD",
              regex = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/\w+\/\d+/g;

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
              //console.dir(data);

              $ticket_url = data.ticket_uri;

              if(typeof $ticket_url === 'undefined')
              {
                console.log("no ticket url available");
              }
              else
              {
                $("#ticket_url").attr("href", $ticket_url);
                $("#ticket").val($ticket_url);
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
            //console.dir(data);

            $cover = data.cover;

            if(typeof $cover.source === 'undefined')
            {
              console.log("no Flyer available");
            }
            else
            {
              $coverImg = $cover.source;
              $("#cover_img").attr("src", $coverImg);
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
              //console.dir(data);

              $results = data;

              if(typeof $results.name === 'undefined')
              {
                console.log($results.name + "is not available");
              }
              else{
                $("#name").val($results.name);
              }

              if(typeof $results.description === 'undefined')
              {
                console.log($results.description + "is not available");
              }
              else{
                $("#description").val($results.description);
              }

              if(typeof $results.start_time === 'undefined')
              {
                console.log($results.start_time + "is not available");
              }
              else{
                $("#start_time").val($results.start_time);
              }

              if(typeof $results.location === 'undefined')
              {
                console.log($results.location + "is not available");
              }
              else{
                $("#location").val($results.venue.street + " " + $results.venue.zip + ", " + $results.venue.city + ", " + $results.venue.country);
              }


              //Image Display
              getCoverImage();

              // Get tickets url
              getTicketUrl();

          },
          error: function(status) {
              console.log("Error: " + status);
          }
      });
    }
    else
    {
        $("#fetch_event").addClass('error');
        console.log("Please Enter a valid Facebook event URL");
    }
  }