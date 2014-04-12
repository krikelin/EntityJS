<?php
/****
 * Entity php
 */
 namespace Entity {
     /***
      * Entity
      ***/
     class Entity {
         public $resolvers = array();
         public function __construct() {
             $this->resolvers = array();
         }
         private function getResolver($uri) {
             foreach($this->resolvers as $resolver) {
                 if ($resolver->acceptsUri($uri)) {
                     return $resolver;
                 }
             }
             return new Resolver();
         }
         public function request($method, $uri, $params = NULL) {
             $resolver = $this->getResolver($uri);
             $resolver->request($method, $uri, $params);
         }
    }
     /**
      * Resolvers
      *
      * @interface
      */
    abstract class Resolver {
        public abstract function request($method, $uri, $params = NULL);
        public abstract function acceptsUri($uri);
    }
    /**
     * MockResolver
     * @class
     * @implements {Resolver}
     */
    class MockResolver extends Resolver {
        public function request($request, $ui, $params = NULL) {
            return array(
                'status' => '404 Not found',
                'data' => array()
            );
        }
        public function acceptsUri($uri) {
            return TRUE;
        }
    }
}
 

 
