class Resolver:
    """
    Base class but also default resolver if no other can be found
    """
    def accepts_uri(self, uri):
        return True
    def request(self, method, uri, params):
        return {
            'status': '404 Not Found',
            'data': None
        }
        
class MusicResolver:
    """
    Music resolver
    """
    def accepts_uri(self, uri):
        return False
    
    def request(self, method, uri, params):
        # TODO Fix this
        return { 'status': '200 OK', 'data': {}}