
var entityjs = (function (exports) {
    
    exports.parseQueryString = function (qs) {

        var queries = qs.split('&');
        var obj = {};
        for (var i = 0; i < queries.length; i++) {
            var query = queries[i];
            var parts = query.split('=');
            obj[parts[0]] = decodeURI(parts[1]);
        }
       
        return obj;
    };
    
    exports.Promise = function () {
        this._done = function() {};
        this._fail = function () {};
        this._always = function() {};
    };
    exports.Promise.prototype.done = function (callback) {
        this._done = callback;
        return this;
    };
    exports.Promise.prototype.fail = function (callback) {
        this._fail = callback;
        return this;
    };
    exports.Promise.prototype.always = function (callback) {
        this._always = callback;
        return this;
    };
    
    exports.Promise.prototype.setDone = function (args) {
        this._done.call(this, args);
        this._always.call(this, args);
    };
    exports.Promise.prototype.setFail = function (args) {
        this._fail.call(this, args);
        this._always.call(this, args);     
    };

    /**
     * A resolver
     * @constructor
     * @class
     * @param {exports.Entity} entity An entity
     **/
    exports.Resolver = function (entity) {
        this.entity = entity;
    };

    /***
     * Determines if this resolver should reply to this kind of request
     *
     * @function
     * @class {exports.Resolver}
     **/
    exports.Resolver.prototype.acceptsUri = function (uri) {
        return false;
    };
    
    /***
     * Determines if this resolver should reply to this kind of request
     *
     * @function
     * @class {exports.Resolver}
     **/
    exports.Resolver.prototype.request = function (method, uri, data) {
        var promise = new exports.Promise();
        return promise;
    };

    exports.Resolver.prototype.login = function () {
        var promise = new Promise();
        setTimeout(function () {
            promise.setDone({'status': 'OK'});
        }, 1000);
        return promise;
    };

    exports.Entity = function () {
        this.resolvers = [];
    };
    /***
     * Registers resolver into the Entity
     *
     * @function
     * @class {exports.Resolver}
     **/
    exports.Entity.prototype.registerResolver = function(resolver) {
    
        this.resolvers.push(resolver);
    };
    
    /**
     * Return a matching resolver for the uri type
     *
     * @private
     * @function
     **/
    exports.Entity.prototype._getResolver = function (uri) {
        for (var i = 0; i < this.resolvers.length; i++) {
            var resolver = this.resolvers[i];
            if (resolver.acceptsUri(uri)) {
                return resolver;
            }
        }
        return null;
    };
    /***
     * Sends an abstract request
     * @function
     * @returns {exports.Promise} a Promise 
     **/
    exports.Entity.prototype.request = function (method, uri, data) {

        // Create a new promise
        var promise = new exports.Promise(); 
        /**
         * Find a matching resolver for the request
         **/ 
         // 1. Get the matching resolver to handle the request
        var resolver = this._getResolver(uri);
           console.log(resolver);
        if (resolver != null) { 
            // alert("T");
            resolver.request(method, uri, data).done(function (response) {
                promise.setDone(response);
            });
        }
        return promise; // Return the promise
    };
    exports.Entity.prototype.login = function () {

        var promise = new exports.Promise();


        return promise;
    };

    

});
entityjs(this);

if (typeof($) !== 'undefined') {
    (function ($) {
       $.entity = function (a) {
        var obj  = {};
        entityjs(obj);
         
       };
    });
}

