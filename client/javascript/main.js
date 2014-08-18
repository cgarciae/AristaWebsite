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
        // switch (event.in.slidr) {
        //
        // case "registro":
        //     document.body.style.backgroundColor = '#60CEC5';
        //     break;
        // case "intro":
        //     document.body.style.backgroundColor = '#EEEEEE';
        //     break;
        // default:
        // }
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

    grafo.update();
    grafo.render();
    scene.update();
    grafo.render();
    scene.update();

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
      setTimeout(control, Math.max( 0, FPS - (new Date() - bufferStart) ) );
    }

    startAnimation();

    document.addEventListener('visibilitychange', function(event) {

        if (document.visibilityState === "hidden") {
            // The page is hidden.
            animate = false;
        } else if (document.visibilityState === "visible") {
            // The page is visible.
            animate = true;
            startAnimation();
        }
    });

    /**
     * Created by Allanz on 24/04/2014.
     */

  data = function(){
    var email = $("#email").val();
    var nombre = $("#name").val();
    var apellido = $("#lastname").val();
    var empresa = $("#company").val();

    if (Usuarios.findOne({email: email})) {
      alert("Este email ya ha sido registrado previamente");
    } else {
      Usuarios.insert({
        email: email,
        nombre: nombre,
        apellido: apellido,
        empresa: empresa
      });

      Meteor.call(
        'sendEmail',
        email,
        'testhginnovacion@gmail.com',
        'Confirmación HG Innovación',
        nombre + ' ' + apellido + ', Gracias por contactarnos. Este es un mensaje de confirmación.'
      );
    }
  };

  var show = false;
  menu = function(){
    if (show){
      $("nav").fadeOut("fast");
      $("#menuBtn").fadeIn("slow");
      show = false;
    }else{
      $("#menuBtn").fadeOut("fast");
      $("nav").fadeIn("slow");
      show = true;
    }
  };

  dotNavigation = function(){
    switch(event.currentTarget.id) {
      case "selectedPage1":
          $("#selectedPage1").addClass("selected");
          $("#selectedPage2").removeClass("selected");
          $("#selectedPage3").removeClass("selected");
          $("#selectedPage4").removeClass("selected");
          $("#selectedPage5").removeClass("selected");
          window.location.href = "#intro"
          break;
      case "selectedPage2":
          $("#selectedPage2").addClass("selected");
          $("#selectedPage1").removeClass("selected");
          $("#selectedPage3").removeClass("selected");
          $("#selectedPage4").removeClass("selected");
          $("#selectedPage5").removeClass("selected");
          window.location.href = "#registro"
          break;
      case "selectedPage3":
          $("#selectedPage3").addClass("selected");
          $("#selectedPage2").removeClass("selected");
          $("#selectedPage1").removeClass("selected");
          $("#selectedPage4").removeClass("selected");
          $("#selectedPage5").removeClass("selected");
          window.location.href = "#registro"
          break;
      case "selectedPage4":
          $("#selectedPage4").addClass("selected");
          $("#selectedPage2").removeClass("selected");
          $("#selectedPage3").removeClass("selected");
          $("#selectedPage1").removeClass("selected");
          $("#selectedPage5").removeClass("selected");
          window.location.href = "#registro"
          break;
      case "selectedPage5":
          $("#selectedPage5").addClass("selected");
          $("#selectedPage2").removeClass("selected");
          $("#selectedPage3").removeClass("selected");
          $("#selectedPage4").removeClass("selected");
          $("#selectedPage1").removeClass("selected");
          window.location.href = "#registro"
          break;
      default:
          console.log("Weird error bro!");
    }
  }
});
