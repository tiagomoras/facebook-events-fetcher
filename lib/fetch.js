var Fetcher = {

  getExtraData: function (url, callback) {
    $.ajax({
      url: url,
      method: 'GET',
      dataType: "json",
      success: callback
    });
  },

  getMainData: function(url, callback){
    $.ajax({
      url: url,
      method: 'GET',
      dataType: "json",
      success: callback
    });

    // var dfd = new $.Deferred();

    // $.ajax({
    //   url: url,
    //   method: 'GET',
    //   dataType: "json",
    //   success: dfd.resolve,
    //   error: dfd.reject
    // });

    // return dfd.promise();

  }

}