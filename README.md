skynet-lifx
===============

Gateblu plugin to control LIFX bulbs.

## Configure your gateway

```javascript
conn.gatewayConfig({
  uuid:  'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXX',
  token: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  method: 'createSubdevice',
  type: 'skynet-lifx',
  name: 'lifx',
  options: {}
}, function(results){ console.log(results); });
```

## Send a message
```javascript
// turn on all bulbs
skynet.message({
  devices : ['xxxxxx-uuid-of-a-skynet-hub-xxx'],
  subdevice : 'lifx',
  payload : {
    setState : {
        on: true
    }
  }
});
```


## Send a message
```javascript
// change color of all bulbs to green
skynet.message({
  devices : ['xxxxxx-uuid-of-a-skynet-hub-xxx'],
  subdevice : 'lifx',
  payload : {
    setState : {
        on: true,
        hue: 20000,
        lum: '0x8000',
        sat: '0xffff'
    }
  }
});
```

## Colors
```javascript
// range: 0 to 65,000
var pink = 60000;
var purple = 50000;
var blue = 40000;
var teal = 30000;
var green = 20000;
var yellow = 10000;
var orange = 5000;
var red = 1000;
```

## Saturation
```javascript
// range: 0x0000 to 0xffff
var color_mode = 0xFFFF;
var white = 0x0000;
```

## Lumosity
```javascript
// range 0x0000 to 0x9000
var off = 0x0000;
var bright = 0x9000;
```

## White (color temperature in Kelvin)
```javascript
// range 0 to 10,000
```


