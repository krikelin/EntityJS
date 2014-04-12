(function (exports) {
    var MusicResolver = function (entity) {
        this.entity = entity;
    };
    MusicResolver.prototype.acceptsUri = function (uri) {
        return uri.match(/^entity\:\/\/music\/track/i) != null;
    };
    MusicResolver.prototype.request = function (method, uri, data) {
       var promise = new Promise();
       var query = {};
       try {
            query = parseQueryString(uri.split('?')[1]);
       } catch (e) {
            
       }
       setTimeout(function () {
           var response = {
               'data': [],
               'status': 'OK'
           };
          var song = {
              'name': query.q,
              'uri': '',
              'artists':[
                {
                    'name': 'track.artist.name',
                    'uri': 'track.artist.link'
                }
              ],
              'album': {
                  'name': 'track.album.name',
                  'uri': ''
              }
          };
          response.data.push(song);
      
          promise.setDone(response);
    
            
        }, 100);
           
       return promise;         
    };
    exports.MusicResolver = MusicResolver;
})(this);
