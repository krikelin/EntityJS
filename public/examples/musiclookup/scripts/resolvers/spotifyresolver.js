(function (exports) {
    var SpotifyResolver = function (entity) {
        this.entity = entity;
    };
    SpotifyResolver.prototype.acceptsUri = function (uri) {
        return uri.match(/^entity\:\/\/music\/track/i) != null;
    };
   
    SpotifyResolver.prototype.request = function (method, uri, data) {
       var promise = new Promise();
       var xmlHttp = new XMLHttpRequest();
       console.log(query);
       var query = parseQueryString(uri.split('?')[1]);
       
       
       xmlHttp.onreadystatechange = function () {
           if (xmlHttp.readyState == 4) {
               if (xmlHttp.status == 200) {
                   var data = JSON.parse(xmlHttp.responseText);
                  var response = {songs: [], status: 'OK'};
                  
                  // Format the response
                  for (var i = 0; i < data.tracks.length; i++) {
                      var track = data.tracks[i];
                      var song = {
                          'name': track.name,
                          'artists':[
                            {
                                'name': track.artists[0].name
                            }
                          ],
                          'album': {
                              'name': track.album.name,
                              
                          }
                      };
                      response.songs.push(song);
                  }
                  console.log(response);
                  promise.setDone(response);
               } else {
                   promise.setFail({
                       'status': xmlHttp.status
                   });
               }
               console.log(xmlHttp.status);
           }
       };
       xmlHttp.open(method, 'https://ws.spotify.com/search/1/track.json?q=' + query.q, true);
       xmlHttp.send(null);
       return promise;         
    };
    exports.SpotifyResolver = SpotifyResolver;
})(window);
