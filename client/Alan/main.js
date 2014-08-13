/**
 * Created by Allanz on 24/04/2014.
 */
 var show = false;

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

menu = function(){
  if (show){
    $("nav").fadeOut("slow");
    $("#menuBtn").fadeIn("fast");
  }else{
    $("#menuBtn").fadeOut("fast");
    $("nav").fadeIn("slow");
  }
};
