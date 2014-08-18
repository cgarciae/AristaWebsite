/**
 * Created by cgarcia on 4/16/14.
 */
//////////////////////////////////////////
///////    Variables Globales      //////
////////////////////////////////////////
mult = 12 * 0.00000001;
//k = 100000;

r = 150;
k2 = 6 * 0.001;

maxMouseForce = 800;
kMouse = 4*100000;
minDistMouse = 150;

varStep = 2;
fixStep = 120;

randForceMag = 8*10;
randForceFixStep = 4;
randForceVarStep = 2;

forceSides = 300;


f = 1;

FPS = 1000 / 60;
dt = FPS / 1000;
max_dt = 1/20;

//////////////////////////////////////////
///////    Funciones Globales      //////
////////////////////////////////////////

randInt = function(max) {
    return Math.floor(
        Random.fraction()*max
    );
};

getRandomeColor = function getRandomColor() {
    return format("rgb({0},{1},{2})",randInt(256),randInt(256),randInt(256));
};

format = function() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
};

distancia = function( objA, objB ){

    return Math.sqrt(
        Math.pow( objA.x - objB.x , 2 ) +
        Math.pow( objA.y - objB.y , 2 )
    );
}

limitForce = function( force, limit ){

    if( force > limit )
        force = limit
    else if ( force < -limit )
        force = -limit;

    return force

}

mouseForce = function(mouse,grafo){

    var dist;

    for( var i = 0; i < grafo.nodes.length; i++ ){

        dist = distancia( grafo.nodes[i], mouse );

        if( dist > minDistMouse ) continue;
        // Modelo de fuerza repulvisa
        //force =  k * ( nodeA - other ) / r²

        grafo.nodes[i].fx += kMouse * ( grafo.nodes[i].x - mouse.x ) / ( dist*dist*dist );
        grafo.nodes[i].fy += kMouse * ( grafo.nodes[i].y - mouse.y ) / ( dist*dist*dist );
    }


}

getMousePos = function(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};

if ( !window.requestAnimationFrame ) {

    window.requestAnimationFrame = ( function() {

        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

                window.setTimeout( callback, 1000 / 60 );

            };

    } )();

}

