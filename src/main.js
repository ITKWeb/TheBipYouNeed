define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Surface = require('famous/core/Surface');
    var InputSurface = require("famous/surfaces/InputSurface");
    var EventHandler = require('famous/core/EventHandler');
   

    //temps
    var tempo=1;
    var size = [100,100];
    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    var logo = new ImageSurface({
        size: [true,true],
        origin: [0.5, 0.5],
        content: 'assets/logo.png',
        classes: ['double-sided'],

    });

    var surface = new Surface({
        size: size,
        content: tempo,

        properties: {
            lineHeight: size[0]+"px",
            textAlign: "center",
            borderRadius:'50%',
            backgroundColor: '#FA5C4F'
        }
    });


    var input = new InputSurface({
        size: [400, true],
        name: 'inputSurface',
        placeholder: '',
        value: '',
        type: 'text'
    });

    var eventHandler = new EventHandler();

    surface.on('click', function() {
        eventHandler.emit('clickedSurface');
    });

    eventHandler.on('clickedSurface', function() {
      tempo===10 ? tempo=1 : tempo=tempo+1;

      size= [100+(tempo-1)*10,100+(tempo-1)*10] ;
      /*size.width = size.height;*/
      surface.setContent(tempo);
      surface.setSize(size);
        surface.setProperties({
            lineHeight: 100+(tempo-1)*10+"px"
        });
    });


    mainContext.add(new Modifier({origin: [.5, .2]})).add(logo);
    mainContext.add(new Modifier({origin: [.5, .8]})).add(surface);


});
