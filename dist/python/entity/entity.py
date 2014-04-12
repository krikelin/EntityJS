#! /usr/env/python 

class Entity:
    resolvers = []
    def get_resolver(self, uri):
        """
        Gets a resolver
        """
        for resolver in self.resolvers:
            if resolver.accepts_uri(uri):
                return resolver
            return Resolver()
    
    def request(self, method, uri, params):
        """
        Request to a entity:// uri
        """
        resolver = self.get_resolver(uri)
        response = resolver.request(method, uri, params)
        return response
    
