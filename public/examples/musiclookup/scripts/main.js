var entity = new Entity();
function search() {
    var selServices = document.querySelector('#resolver');
    var resolverId = selServices.options[selServices.selectedIndex].value;
    console.log(window);
    console.log(resolverId);
    var resolver = new window[resolverId]();
    entity.resolvers = []; // Clear the resolvers
    entity.registerResolver(resolver);
    console.log("T");
    entity.request('GET', 'entity://music/track?q=' + encodeURI(document.getElementById('query').value), {}).done(function (result) {
       document.querySelector('#result').innerHTML = '';
       console.log(result);
       for (var i = 0; i < result.data.length; i++) {
           var song = result.data[i];
           document.querySelector('#result').innerHTML += '<tr><td><a href="' + song.uri + '">' + song.name + '</a></td><td>' + song.artists[0].name + '</td></tr>';
           
       } 
    });
    
}


