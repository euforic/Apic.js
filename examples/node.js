/**
 * Apic Node.js Example
 */

// Superagent is not exposed through the apic frameworks on node
// because you can easily add it to your package.json via `npm install superagent`

var apic = require('apic');

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

// Export the Generated API
module.exports = scApic.api;