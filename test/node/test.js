var apic = require('../../');

var apiSchema = {
    user:[
        { action:'create' , verb:'PUT'    }
      , { action:'login'  , verb:'POST'   }
      , { action:'logout' , verb:'GET'    }
      , { action:'remove' , verb:'DELETE' }
    ]
  , job:[
      { action:'create' , verb:'PUT'    }
    , { action:'update' , verb:'POST'   }
    , { action:'remove' , verb:'DELETE' }
    , { action:'show'   , verb:'GET'    }
]};

describe('apic create', function(){
  describe('with out schema', function(){

    var gApi = apic().api;

    it('should create apic object with an empty api object', function(){
      // Test apic Object
      gApi.should.be.a('object');
    });
  });
});

describe('apic create', function(){
  describe('with a schema', function(){

    var gApi = apic(apiSchema).api;

    it('should generate the api', function(){
      // Test apic Object
      gApi.should.be.a('object');

      var test = gApi.should.have.property( 'user' ).and.be.a('object')
        .have.keys(['create','login','logout','remove']);

      gApi.should.have.property( 'job' ).and.be.a('object')
        .have.keys(['create','update','remove','show']);
    });
  });
});


describe('apic create', function(){
  describe('with out schema', function(){

    var gapic = apic();

    it('should create apic object with empty api object', function(){
      gapic.api.should.be.a('object');
    });

    describe('add array of namespace actions', function(){
      gapic.add('user',[{action:'create', verb:'POST'}]);

      it('should create functions', function(){
        var gApi = gapic.api;
        // Test apic Object
        gApi.should.be.a('object')
          .and.have.property('user')
          .have.keys(['create']);
      });
    });

    describe('add single namespace function', function(){
      gapic.add('product', {action:'show', verb:'GET'});

      it('should create namespace function', function(){
        var gApi = gapic.api;
        // Test apic Object
        gApi.should.be.a('object')
          .and.have.property('product')
          .have.keys(['show']);
      });
    });
  });
});
