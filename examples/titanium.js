/**
 * Apic Titanium Mobile Example
 */
var Apic = require('apic')
  , apic = Apic.apic;

var schema = {
  user: [
    { action: 'show',    verb:'GET' },
    { action: 'create',  verb:'PUT' },
    { action: 'remove',  verb:'DELETE' },
    { action: 'login',   verb:'POST' },
    { action: 'credits', verb:'GET' }
  ],
  job: [
    { action: 'show',   verb:'GET' },
    { action: 'create', verb:'PUT' },
    { action: 'remove', verb:'DELETE' },
    { action: 'update', verb:'POST' },
  ],
  contact: [
    { action: 'show',   verb:'GET' },
    { action: 'add',    verb:'PUT' },
    { action: 'remove', verb:'DELETE' },
    { action: 'update', verb:'POST' },
    { action: 'search', verb:'GET' }
  ]
};

var scApic = apic(schema);
    scApic.baseUrl = 'http://localhost:3000';

module.exports = scApic.api;



// Superagent example
// This is strictly exposed for extra convenience if needed
//
// For more examples see https://github.com/visionmedia/superagent

var request = Apic.request;

request
  .post('/api/pet')
  .send({ name: 'Manny', species: 'cat' })
  .set('X-API-Key', 'foobar')
  .set('Accept', 'application/json')
  .end(function(res){
    //Do something
  });
