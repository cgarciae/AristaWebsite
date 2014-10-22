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

  project = function(){
    switch(event.currentTarget.id) {
      case "project1":
        $("#projectImg").attr("src","images/project1.png");
        $("#projectName").html("Campus EAFIT");
        $("#projectContent").html("Campus EAFIT es una aplicacion sencilla que demuestra el poder de la Realidad Aumentada de mostrar lo que otros medios no pueden, esto es, información tridimensional sobre estructuras reales. Con esta aplicaciones el usuario puede explorar la Universidad EAFIT desde cualquier ángulo con RA, e interactuar con los edificios mediante gestos para explorarlos con más detalle. Una versión anterior de Campus EAFIT fue demostrada en Virtual Educa (Panamá).");
        $("#logoOwner").attr("src","images/eafit.png");
        break;
      case "project2":
        $("#projectImg").attr("src","images/project2.png");
        $("#projectName").html("D-Tech");
        $("#projectContent").html("Durante el evento de EXPO Camacol 2012 se realizó un acompañamiento  experiencial para los visitantes del stand de Cerámica Italia; éste consistía en la transmisión a dos pantallas grandes de una casa mágica. Esta casa se armaba con fichas que hacían a su vez parte del folleto que más tarde quedaría de souvenir y portafolio para los clientes. La magia estaba en que cada parte de la casa (baño, sala-comedor, alcoba, cocina, patio) permitía en forma de RA cambiar en tiempo real al modelo la cerámica que más le gustase al visitante en cada ambiente según la colección actual de la empresa, D-Tech. Esta experiencia tuvo una gran acogida con descargas post evento de hasta 100 diarias en iOS.");
        $("#logoOwner").attr("src","images/italia.png");
        break;
      case "project3":
        $("#projectImg").attr("src","images/project3.png");
        $("#projectName").html("Foro de la Moda");
        $("#projectContent").html("Inexmoda tenía una preocupación con un subevento llamado el Foro de la Moda, que en años anteriores no habia tenido mayor acogida; pero debido a su nivel informativo querían darle mayor flujo de personas. La Realidad Aumentada desarrollada para el evento no solo aumentó considerablemente el tráfico de personas en el lugar si no en redes sociales. De nuevo con el concepto de souvenir, se tomaba una foto con la bolsa que cada persona tenía desde la entrada y con transmisión por AirPlay de video se veía cómo la bolsa se “encantaba” con elementos Vintage, de acuerdo al concepto definido para ésta feria.");
        $("#logoOwner").attr("src","images/inexmoda.png");
        break;
      default:
          console.log("Weird error bro!");
    }
  }

  dotNavigation = function(){
    switch(event.currentTarget.id) {
      case "selectedPage1":
          $("#selectedPage1").addClass("selected");
          $("#selectedPage2").removeClass("selected");
          $("#selectedPage3").removeClass("selected");
          $("#selectedPage4").removeClass("selected");
          $("#selectedPage5").removeClass("selected");
          window.location.href = "#home"
          break;
      case "selectedPage2":
          $("#selectedPage2").addClass("selected");
          $("#selectedPage1").removeClass("selected");
          $("#selectedPage3").removeClass("selected");
          $("#selectedPage4").removeClass("selected");
          $("#selectedPage5").removeClass("selected");
          window.location.href = "#information"
          break;
      case "selectedPage3":
          $("#selectedPage3").addClass("selected");
          $("#selectedPage2").removeClass("selected");
          $("#selectedPage1").removeClass("selected");
          $("#selectedPage4").removeClass("selected");
          $("#selectedPage5").removeClass("selected");
          window.location.href = "#why"
          break;
      case "selectedPage4":
          $("#selectedPage4").addClass("selected");
          $("#selectedPage2").removeClass("selected");
          $("#selectedPage3").removeClass("selected");
          $("#selectedPage1").removeClass("selected");
          $("#selectedPage5").removeClass("selected");
          window.location.href = "#experiences"
          break;
      case "selectedPage5":
          $("#selectedPage5").addClass("selected");
          $("#selectedPage2").removeClass("selected");
          $("#selectedPage3").removeClass("selected");
          $("#selectedPage4").removeClass("selected");
          $("#selectedPage1").removeClass("selected");
          window.location.href = "#register"
          break;
      default:
          console.log("Weird error bro!");
    }
  }
});
