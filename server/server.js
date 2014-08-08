/**
 * Created by Alan Kelvin López on 24/04/2014.
 */

process.env.MAIL_URL = "smtp://testhginnovacion%40gmail.com:hginnovacion@smtp.gmail.com:465/";

Meteor.methods({
    //////////////////////////////////////////
    /////////    Send an email    ///////////
    ////////////////////////////////////////
    sendEmail: function (to, from, subject, text) {

        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
    }
});