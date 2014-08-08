var Basic, Node;


Basic = function () {
    "use strict";
};

Basic.prototype.setFill = function (str) {
    "use strict";
    this.shape.fill = str;
    return this;
};

Basic.prototype.setStroke = function (str) {
    "use strict";
    this.shape.stroke = str;
    return this;
};

Basic.prototype.setLineWidth = function (str) {
    "use strict";
    this.shape.linewidth = str;
    return this;
};

//////////////////////////////////////////
/////////    Node      //////////////////
////////////////////////////////////////
Node = function (x, y, radius, scene, isDynamic) {
    "use strict";
    //Create body
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.fx = 0;
    this.fy = 0;
    this.rad = radius;
    this.mass = 1;

    this.edges = [];
    this.edgelines = [];

    this.time = 0;
    this.nextRandomForceUpdateTime = randForceFixStep + randForceVarStep * Math.random();

    this.randForce = {
        x : (Math.random() - 0.5) * randForceMag,
        y : (Math.random() - 0.5) * randForceMag
    };

    this.isDynamic = isDynamic !== undefined ?  isDynamic : true;

    //Create shape in the scene
    this.shape = scene.makeCircle(x, y, radius);

    this.setFill("black").setStroke("black").setLineWidth(2);

};

Node.prototype = new Basic();

Node.prototype.render = function () {
    //Update Shape
    this.shape.translation.x = this.x;
    this.shape.translation.y = this.y;
}

Node.prototype.update = function(delta){
    "use strict";
    if (!this.isDynamic) {
        return;
    }

    this.fx = limitForce(this.fx, maxMouseForce);
    this.fy = limitForce(this.fy, maxMouseForce);

    this.vx +=  delta * (this.fx) / this.mass;
    this.vy +=  delta * (this.fy) / this.mass;

    this.x += delta * this.vx;
    this.y += delta * this.vy;

    //Restar forces
    this.fx = 0;
    this.fy = 0;

};

Node.prototype.calculateForces = function () {
    "use strict";
    if (!this.isDynamic) {
        return;
    }
    var i, nodeB, dist, dir;

    for (i = 0; i < this.edges.length; i++) {

        nodeB = this.edges[i];

        dist = distancia(this, nodeB);

        //Calculate direction
        dir = dist - r;

        if (dir < 0) {
            dir *= 2;
        }


        //force += k2 * ( other - this ) * dir
        this.fx += k2 * (nodeB.x - this.x) * dir;
        this.fy += k2 * (nodeB.y - this.y) * dir;
    }

    //Friction Force
    this.fx -= f * this.vx;
    this.fy -= f * this.vy;


    //Wall force
    if (this.x - this.rad < 0) {
        this.fx += forceSides;
    }

    if (this.x + this.rad > window.innerWidth) {
        this.fx += -forceSides;
    }

    if (this.y - this.rad < 0) {
        this.fy += forceSides;
    }

    if (this.y + this.rad > window.innerHeight) {
        this.fy += -forceSides;
    }


    //Random Force
    this.time += dt;

    this.fx +=  this.randForce.x;
    this.fy +=  this.randForce.y;

    //Update Random Force
    if (this.time >= this.nextRandomForceUpdateTime) {

        this.randForce.x = (Math.random() - 0.5) * randForceMag;
        this.randForce.y = (Math.random() - 0.5) * randForceMag;

        this.time = 0;
        this.nextRandomForceUpdateTime = randForceFixStep + randForceVarStep * Math.random();

    }

}

//////////////////////////////////////////
/////////    Edges      /////////////////
////////////////////////////////////////

Edge = function ( nodeA, nodeB, scene ){

    this.nodeA = nodeA;
    this.nodeB = nodeB;

    this.shape = scene.makeLine(nodeA.x, nodeA.y, nodeB.x, nodeB.y );

    this.setStroke("#404040").setLineWidth(2);

}

Edge.prototype = new Basic();

Edge.prototype.render = function(){

    var width = this.nodeB.x - this.nodeA.x;
    var height = this.nodeB.y - this.nodeA.y;

    var w2 = width / 2;
    var h2 = height / 2;


    this.shape.vertices[0].set(- w2, - h2 );
    this.shape.vertices[1].set( w2, h2 );

    // Center line and translate to desired position.
    this.shape.translation.set(
        this.nodeA.x + w2,
        this.nodeA.y + h2
    );

    
};

//////////////////////////////////////////
/////////    Grafo      /////////////////
////////////////////////////////////////

Grafo = function( dataNode, scene ){

    this.nodes = [];
    this.edges = [];


    var node, i, j, line;
    for( i = 0; i < dataNode.length; i++ ){

        node = dataNode[i];

        this.nodes.push(
            new Node( node.x, node.y, Math.floor( 10 + (Math.random()*Math.random()*Math.random())*10 ), scene, node.isDynamic )
        );
    }

    for( i = 0; i < this.nodes.length; i++ ){



        for( var _j = 0; _j < dataNode[i].edges.length; _j++  ){


            j = dataNode[i].edges[_j];

            if( ! _.contains( this.nodes[i].edges, this.nodes[j] ) ){

                line = new Edge( this.nodes[i], this.nodes[j], scene );

                this.nodes[i].edges.push( this.nodes[j] );
                this.nodes[j].edges.push( this.nodes[i] );

                this.nodes[i].edgelines.push( line );
                this.nodes[j].edgelines.push( line );

                this.edges.push(line);

            }
        }
    }

    var lines = scene.makeGroup(),
        circles = scene.makeGroup();

    for( var i = 0; i < this.nodes.length; i++ ){
        circles.add( this.nodes[i].shape );
    }

    for( var i = 0; i < this.edges.length; i++ ){
        lines.add( this.edges[i].shape );
    }

}


Grafo.prototype.update = function(delta){
    "use strict";
    var node, i;

    if (!delta) {
        delta = dt;
    }

    delta = Math.min(max_dt, delta);

    for (i = 0; i < this.nodes.length; i++) {
        node = this.nodes[i];
        node.calculateForces();
        node.update(delta);
    }

};

Grafo.prototype.render = function(){
    "use strict";
    var i;

    for (i = 0; i < this.nodes.length; i++) {
        this.nodes[i].render();
    }

    for (i = 0; i < this.edges.length; i++) {
        this.edges[i].render();
    }

};

Grafo.prototype.repulse = function( nodeA, nodeB ){

    var fx = -( nodeB.x - nodeA.x );
    var fy = -( nodeB.y - nodeA.y );

    fx *= dt;
    fy *= dt;

    force.set( fx, fy );

}

Grafo.prototype.kNearest = function( num, k ){

    var nodeData = [];

    var i;
    for( i = 0; i < num; i++ ){

        nodeData.push({
            x: window.innerWidth/2  *( 1 + (Math.random()*2 -1) ),
            y: window.innerHeight/2 *( 1 + (Math.random()*2 -1) ),
            isDynamic: true
        });

    }

    for( i = 0; i < nodeData.length; i++ ){

        var lista = [];

        for( var j = 0; j < nodeData.length; j++ ){
            if( i !== j )
            {
                lista.push(
                    [ distancia( nodeData[i], nodeData[j] ),  j  ]
                );
            }
            else{
                lista.push( [ Infinity, j ] );
            }
        }

        lista.sort( function (a,b) {
            return a[0] - b[0];
        });


        nodeData[i].edges = [];

        var n,
            rand = Math.random(),
            num = rand < 0.2? k - 1 : rand < 0.85 ? k : rand < 0.95 ? k + 1 : k + 2;

            for( n = 0; n < num; n++  ){
            nodeData[i].edges.push(
                lista[n][1]
            );
        }


    };

    return nodeData

}

Grafo.prototype.getNodeNearestTo = function( pos ){

    var minDist = Infinity,
        minNode, dist;

    for( var i in this.nodes ){

        if( this.nodes[i] == pos ) continue;

        dist = distancia( this.nodes[i], pos );

        if( dist < minDist ){
            minDist = dist;
            minNode = grafo.nodes[i];
        }

    }

    return minNode
}

Grafo.prototype.setStaticNodesInScreenEdges = function( ){

    return

    var percent = 0.92,
        w = window.innerWidth,
        h = window.innerHeight,
        node,
        pos = {};



    //Nodo mas cercano a la esquina Arriva Izquierda
    pos.x = w*(1-percent);
    pos.y = h*(1-percent);

    node = this.getNodeNearestTo( pos );
    node.x = pos.x;
    node.y = pos.y;
    node.update();
    node.isDynamic = false;

    //Nodo mas cercano a la Arriva Centro
    pos.x = w*0.5;

    node = this.getNodeNearestTo( pos );
    node.x = pos.x;
    node.y = pos.y;
    node.update();
    node.isDynamic = false;



    //Nodo mas cercano a la esquina Arriva Derecha
    pos.x = w*(percent);

    node = this.getNodeNearestTo( pos );
    node.x = pos.x;
    node.y = pos.y;
    node.update();
    node.isDynamic = false;



    //Nodo mas cercano a la esquina Abajo Derecha
    pos.y = h*(percent);

    node = this.getNodeNearestTo( pos );
    node.x = pos.x;
    node.y = pos.y;
    node.update();
    node.isDynamic = false;

    //Nodo mas cercano a la esquina Abajo Derecha
    pos.x = w*0.5;

    node = this.getNodeNearestTo( pos );
    node.x = pos.x;
    node.y = pos.y;
    node.update();
    node.isDynamic = false;



    //Nodo mas cercano a la esquina Abajo Izquierda
    pos.x = w*(1-percent);

    node = this.getNodeNearestTo( pos );
    node.x = pos.x;
    node.y = pos.y;
    node.update();
    node.isDynamic = false;



}
