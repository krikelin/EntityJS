# Entity.JS
Data abstraction layer framework for JavaScript.
Projet under construction

# Introduction
Web HTML5 mashups usually mix services of different kind. The services deals with different set of entities.
With Entity.JS we want to add an abstraction layer for the communication with the various REST apis, so mashups can be vendor-independent
when it comes to data consuming, so they easily can be ported. Instead there is an standardized communication style for entities.

# Example usage
Suppose you have a mashup that lookup music from a music service for a certain people. Today you would do this for looking up cars:

    $.getJSON('http://ws.spotify.com/search/track.json?q=' + q, function (data {
        $.each(data.objects, function (items)) {
            // Populate cars
        });
    }))
    
With EntityJS you do following

First register your custom resolver

    ...
    var entity = new Entity();
    entity.registerResolver(new SpotifyResolver());
    ...

Note: See more about resolvers later in this document.
    
    ...
    entity.request('GET', 'entity://music/track/?q=' + regno, {}).done(function (response) {
        $.each(response.objects, function (car) {6
            // Populate cars
        });
    }).fail(function () {
        // Show error message
    });
    ...
    
This assumes there is an resolver for the specific car service have been written and registred with the entity object.

A middle man ajax solution for dynamic mashups, calling abstract entities that are resolved upon request time, will makes i