'use strict';

var lifx = require('lifx');

var lx = lifx.init();

lx.on('bulbstate', function(b) {
  //console.log('Bulb state: ' + util.inspect(b));
});

lx.on('bulbonoff', function(b) {
  //console.log('Bulb on/off: ' + util.inspect(b));
});

lx.on('bulb', function(b) {
  console.log('New bulb found: ' + b.name);
});

lx.on('gateway', function(g) {
  console.log('New gateway found: ' + g.ip);
});


function Plugin(messenger, options){
  this.messenger = messenger;
  this.options = options;
  return this;
}

var optionsSchema = {
  type: 'object',
  properties: {
  }
};

var messageSchema = {
  type: 'object',
  properties: {
    setState: {
      type: 'object',
      properties: {
        bulbName: {
          type: 'string,array',
          required: false
        },
        on: {
          type: 'boolean'
        },
        lum: {
          type: 'number'
        },
        hue: {
          type: 'number'
        },
        sat: {
          type: 'number'
        },
        timing: {
          type: 'number'
        },
        white: {
          type: 'number'
        }
      }
    }
  }
};


function getBulbNames(s){
  if(!Array.isArray(s.bulbName)){
    return [s.bulbName];
  }
  else{
    return s.bulbName;
  }
}

Plugin.prototype.onMessage = function(message, fn){

  if(message.payload && message.payload.setState){
    var s = message.payload.setState;
    if(s.on === true){
      if(!s.bulbName){
        lx.lightsOn();
      }else{
        getBulbNames(s).forEach(function(bulb){
          lx.lightsOn(bulb);
        });
      }
    }else if(s.on === false){
      if(!s.bulbName){
        lx.lightsOff();
      }else{
        getBulbNames(s).forEach(function(bulb){
          lx.lightsOff(bulb);
        });
      }
    }else{
      var hue = s.hue || 0;
      var sat = s.sat || 0;
      var lum = s.lum || 0;
      var white = s.white || 0;
      var timing = s.timing || 0;
      if(!s.bulbName){
        lx.lightsColour(hue, sat, lum, white, timing);
      }else{
        getBulbNames(s).forEach(function(bulb){
          lx.lightsColour(hue, sat, lum, white, timing, bulb);
        });
      }
    }

  }

};

Plugin.prototype.destroy = function(){
  //clean up
  console.log('destroying.', this.options);
};


module.exports = {
  Plugin: Plugin,
  optionsSchema: optionsSchema,
  messageSchema: messageSchema
};
