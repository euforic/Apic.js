# apic - Epic API Client Builder.
  Are you tired of writing trivial restful api clients I know I am! apic is a cross-platform automatic api client builder!

## Supported Platforms
  - Titanium Mobile
  - Browser
  - Node.js

## Schema
The api schema is composed of __namespaces__, __actions__, __verb__, __url__(optional), __path__(optional).
Overide default action request path by setting the path option.
Overide base url by setting the url option.

```js
var sampleSchema = {
  // Creates _user_ namespace
  user:[
      // Request will result in a get request to `BASE_URL/user/show`
      { action:'show'   , verb:'GET' }

      // Request will result in a put request to `BASE_URL/account/add/new`
    , { action:'create' , verb:'PUT', path:'/account/add/new' }

      // Request will result in delete request to `http://api.adhocurl.com/remove`
    , { action:'remove' , verb:'DELETE' url:'http://api.adhocurl.com' }

      // Request will result in a post request to `http://api.adhocurl.com/member/auth`
    , { action:'login'  , verb:'POST', url:'http://api.adhocurl.com', path:'/member/auth' }
  ]
, job:[
    { action:'create' , verb:'PUT'    }
  , { action:'update' , verb:'POST'   }
  , { action:'remove' , verb:'DELETE' }
  , { action:'show'   , verb:'GET'    }
  ]
};
```

## Create w/ Schema
Geneate an API w/ the Provided Schema

```js
// Create apic w/ Schema
var scapic = apic(sampleSchema);

// Set API's Base Url.
// If Omitted will default to `'/'`
scapic.baseUrl = 'http://api.mysite.com';
```

## Add Namespace actions
Add namespace to apic api

```js
// Create new apic
var nsapic = apic();

// Set Base Url
nsapic.baseUrl = 'http://api.myothersite.com';

// Add namespace actions
nsapic.add('product', [
    { action:'create' , verb:'PUT'    }
  , { action:'update' , verb:'POST'   }
  , { action:'remove' , verb:'DELETE' }
]);

// Add another action to namespace
nsapic.add('product', [{ action:'show'   , verb:'GET' }]);

// Add more to our schema generated api example
scapic.add('user', [{ action:'message'   , verb:'POST' }]);
```

## Using you Generated API
```js
// Generated APIs
var scApi = myapic.api;
var nsApi = nsapic.api;

// apic Generated APIs

scApi.user.create('ted' , function(response){
  // Do something with response;
});

scApi.job.update({status :'complete'} , function(response){
  // Do something with response;
});

scApi.user.message({ id : 007, message:'Api Clients\'s are easy with apic'} , function(response){
  // Do something with response;
});

nsApi.product.create('book' , function(response){
  // Do something with response;
});

nsApi.product.show({status :'available'} , function(response){
  // Do something with response;
});
```

## Running tests

  Install dependencies:

    $ npm install -d

  Run tests

    $ make test

## License

(The MIT License)

Copyright (c) 2012 Christian Sullivan &lt;cs@euforic.co&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.