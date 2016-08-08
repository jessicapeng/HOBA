$(document).ready(function() {
    $("#submit").click(function() {
       reactToDataValidation(checkDataValidation($("#first").val(), $("#last").val(), $("#email").val(), $("#phone").val()));
    });
});

function checkDataValidation(first_name, last_name, email, number) {
  var f = validateName(first_name);
  var l = validateName(last_name);
  var e = validateEmail(email);
  var p = validatePhoneNumber(number);
  return [f,l,e,p];
} //new comment added

function isValid(validation) {
    var returner = true;
    for(var i = 0; i < validation.length; i++) {
        if(validation[i] == false) {
            returner = validation[i];
            break;
        }
    }
    return returner;
}

function reactToDataValidation(validation) {
    if(!validation[0]) {
        $("#first").css({
            "border": "1px solid red"
        });
    } else {
        $("#first").css({
            "border": "none"
        });
    }
    if(!validation[1]) {
        $("#last").css({
            "border": "1px solid red"
        });
    } else {
        $("#last").css({
            "border": "none"
        });
    }
    if(!validation[2]) {
        $("#email").css({
            "border": "1px solid red"
        });
    } else {
        $("#email").css({
            "border": "none"
        });
    }
    if(!validation[3]) {
        $("#phone").css({
            "border": "1px solid red"
        });
    } else {
        $("#phone").css({
            "border": "none"
        });
    }
    if(isValid(validation)) {
      var name = $("#first").val() + " " + $("#last").val();
      var address = $("#email").val();
      var phone = $("#phone").val();
      var email = "Name: " + name + " Phone number: " + phone + " Email: " + address;
      email = "email=" + email;
      $.ajax({
        type: "POST",
        url: "php.php",
        data: email,
        success: function() {
          alert("successful attempt!");
        }
      });
    }
}

function validateEmail(email) {
  //use of expressions below...
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateName(name) {
  var returner = true;
  if(name.length > 0) {
    for(var i = 0; i < 10; i++) {
      if(name.indexOf(i) != -1) {
        returner = false;
        break;
      }
    }
  } else {
    returner = false;
  }
  return returner;
}

function validatePhoneNumber(number) {
    var returner = true;
//    alert("lol");

    number = removeSpaces(number);
//    alert(removeSpaces(number));
    if(returner == true) {
        returner = number.charAt(0) == "(" && number.charAt(4) == ")";
    }
    if(returner == true) {
        var indexes = [1,2,3,5,6,7,9,10,11,12];
        var temp = true;
        for(var i = 0; i < indexes.length; i++) {
            if(isNaN(number.charAt(indexes[i]))) {
                temp = false;
                break;
            }
        }
        returner = temp;
    }
    returner = number.charAt(8) == "-";
    return returner;
}

function removeSpaces(number) {
    var returner = "";
    for(var i = 0; i < number.length; i++) {
        if(number.charAt(i) != " ") {
            returner += number.charAt(i);
        }
    }
    return returner;
}
