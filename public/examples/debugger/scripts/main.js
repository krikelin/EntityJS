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
    entity.request('GET', document.getElementById('url').value, {}).done(function (result) {
       document.querySelector('#result').innerHTML = JSON.stringify(result);
      
    });
    
}


