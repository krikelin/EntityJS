(function (exports) {
    var AmazonResolver = function (entity) {
        this.entity = entity;
    };
    AmazonResolver.prototype.acceptsUri = function (uri) {
        return uri.match(/^entity\:\/\/music\/track/i) != null;
    };
    AmazonResolver.prototype.request = function (method, uri, data) {
       var promise = new Promise();
       var xmlHttp = new XMLHttpRequest();
       var query = parseQueryString(uri.split('?')[1]);
       xmlHttp.onreadystatechange = function () {
           if (xmlHttp.readyState == 4) {
               if (xmlHttp.status == 200) {
                   var data = JSON.parse(xmlHttp.responseText);
                  var response = {songs: [], status: 'OK'};
                  
                  // Format the response
                  for (var i = 0; i < data.data.length; i++) {
                      var track = data.data[i];
                      var song = {
                          'name': track.title,
                          'uri': track.link,
                          'artists':[
                            {
                                'name': track.artist.name,
                                'uri': track.artist.link
                            }
                          ],
                          'album': {
                              'name': track.album.name,
                              'uri': ''
                          }
                      };
                      response.data.push(song);
                  }
                  promise.setDone(response);
               } else {
                   promise.setFail({
                       'status': xmlHttp.status
                   });
               }
           } 
       };
       xmlHttp.open(method, 'https://api.deezer.com/search/?q=' + query.q, true);
       xmlHttp.send(null);
       return promise;         
    };
    exports.AmazonResolver = AmazonResolver;
})(this);
