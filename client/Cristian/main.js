


Meteor.startup( function(){

    //////////////////////////////////////////
    /////////    Slides      ////////////////
    ////////////////////////////////////////

    window.onhashchange = function () {
        sl.slide(location.hash.slice(1));
    };

    function onSlideChange(event) {
        "use strict";
        console.log(event.in.slidr);
        switch (event.in.slidr) {

        case "registro":
            document.body.style.backgroundColor = '#60CEC5';
            break;
        case "intro":
            document.body.style.backgroundColor = '#EEEEEE';
            break;
        default:
        }
    }


    sl = slidr.create('slides', {
        after: function(e) { },
        before: onSlideChange,
        breadcrumbs: true,
        direction: 'h',
        fade: false,
        controls: 'border',
        keyboard: true,
        timing: {'linear': '0.75s'},
        overflow: true,
        theme: '#222',
        touch: true,
        transition: 'linear'
    }).start();

    /////////////////////////////
    ///////    Two      ////////
    ///////////////////////////

    var canvasContainer = document.querySelector("#canvas");

    // Make an instance of two and place it on the page.
    var params = {
        width: window.innerWidth,
        height: window.innerHeight,
        type: Two.Types.svg
    };
    scene = new Two(params).appendTo(canvasContainer);





      ////////////////////////////////////////
     ////////    Start      /////////////////
    ////////////////////////////////////////

    lines = scene.makeGroup();
    nodes = scene.makeGroup();


    //twoScene.add(lines,nodes);

    nodes = [
        {
            x: 300, y: 300,
            edges: []
        },
        {
            x: 100, y: 100,
            edges: []
        },
        {
            x: 100, y: 400,
            edges: []
        },
        {
            x: 500, y: 150,
            edges: []
        }
    ];

    nodes = Grafo.prototype.kNearest( 15, 1 );

    grafo = new Grafo( nodes, scene );

    grafo.setStaticNodesInScreenEdges();

    scene.update();


    //////////////////////////////////////////
    /////////    Canvas Events      /////////
    ////////////////////////////////////////

    var canvas = document.querySelector('body');

    function mouseEvent(evt) {
        var mousePos = getMousePos(canvas, evt);
        mouseForce( mousePos, grafo );

    }

    canvas.addEventListener('mousemove', mouseEvent , false);


    //////////////////////////////////////////
    /////////    Simulate      //////////////
    ////////////////////////////////////////

    simulating = true;

    var lag = 0, nonSimulationStart, bufferStart = new Date();


    console.time("Update Grafo");
    grafo.update();
    console.timeEnd("Update Grafo");

    console.time("Primer Render");
    grafo.render();
    scene.update();
    console.timeEnd("Primer Render");

    console.time("Update");
    grafo.render();
    scene.update();
    console.timeEnd("Update");


    animate = true;
    n = 0;

    startAnimation = function() {

        nonSimulationStart = new Date();
        bufferStart = new Date();
        control();
    }

    control = function () {


        if (animate) {
            startTime = new Date();
            bufferStart = new Date();
            setTimeout(input, 0);
        }
    }

    //Input
    function input () {

        //Proceed to update
        setTimeout(update, 0)
    }

    //Update
    function update() {

        grafo.update((new Date() - nonSimulationStart)/1000);
        window.requestAnimationFrame(render);
        //console.log((new Date() - nonSimulationStart)/1000);
        nonSimulationStart = new Date();
    }


    function render () {


        grafo.render();
        scene.update();

        if( n++ < 20)
         console.log(FPS - (new Date() - bufferStart));

        setTimeout(control, Math.max( 0, FPS - (new Date() - bufferStart) ) );


    }

    startAnimation();

    document.addEventListener('visibilitychange', function(event) {

        if (document.visibilityState === "hidden") {
            // The page is hidden.
            console.log("hiding");
            animate = false;
        } else if (document.visibilityState === "visible") {
            // The page is visible.
            animate = true;
            startAnimation();
        }


    });

});
