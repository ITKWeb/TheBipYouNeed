define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Surface = require('famous/core/Surface');
    var EventHandler = require('famous/core/EventHandler');
   var TransitionableTransform = require("famous/transitions/TransitionableTransform");


    //tempo + taille d'origine
    var tempo=1;
    var size = [100,100];
    var color = ['#FA5C4F', '#E15347', '#C84A3F' ,  '#AF4037','#96372F'];
    var durationTime = 150;
    // create the main context
    var mainContext = Engine.createContext();
    var transitionableTransform = new TransitionableTransform();
    var eventHandler = new EventHandler();

    //Anomation pour la surface de commande
    var modifier = new Modifier({
    origin: [.5,.7],
    transform: transitionableTransform
    });


    // logo indique si son actif ou pe
    var logo = new ImageSurface({
        size: [true,true],
        origin: [0.5, 0.5],
        content: 'assets/logo.png',
        classes: ['double-sided'],
    });

    /* click mute */
    logo.on('click', function(){
        if(Metronome.sound===false){
            Metronome.sound=true;
            logo.setContent('assets/logo.png');
        }else{
            Metronome.sound=false;
            logo.setContent('assets/logo_off.png');
        }
    });

    //surface de commande
    var surface = new Surface({
        size: size,
        content: tempo,

        properties: {
            lineHeight: size[0]+"px",
            textAlign: "center",
            borderRadius:'50%',
            backgroundColor: color[0]
        }
    });

    //1 clic = changement de tempo
    surface.on('click', function() {
        eventHandler.emit('clickedSurface');
    });

    //animation a chaque temps
    surface.animate = function(){
        var newDuration=durationTime-(tempo-1)*20;

        transitionableTransform.setScale([1.1,1.1,1.1], {duration: newDuration});
        transitionableTransform.setScale([1,1,1], {duration: newDuration});
        console.log('dur',newDuration);
    };

    //lien metronome/surface de commande
    Metronome.surface = surface;


    //1clic = surface de commande + grande, on indique le tempo au centre
    eventHandler.on('clickedSurface', function() {
      tempo===5 ? tempo=1 : tempo=tempo+1;

      tempo_plus = 50;
      Metronome.bpm(tempo*tempo_plus);
      surface.setContent(tempo*tempo_plus);

      surface.setSize([100+tempo*10,100+tempo*10]);
      surface.setProperties({ lineHeight: 100+tempo*10+"px",backgroundColor: color[tempo-1]});



    });


    mainContext.add(new Modifier({origin: [.5, .2]})).add(logo);
    mainContext.add(modifier).add(surface);


});
