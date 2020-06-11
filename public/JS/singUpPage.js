$(document).ready(function () {
    
    //handle password box
    $(".passwordIcon").click(function () { 
        if($("#inputPassword3").attr("type") === "password")
        {
            $("#inputPassword3").attr("type", "text");
            $(".passwordIcon").removeClass("fa fa-eye-slash").addClass("fa fa-eye");
        }
        else
        {
            $("#inputPassword3").attr("type", "password");
            $(".passwordIcon").removeClass("fa fa-eye").addClass("fa fa-eye-slash");
        }
    });

    //handle for send data to sever for sing up
    $(".btn-primary").click(function () { 
        let userInformationObject = new userInfoConstructor($("#inputUserName").val(), $("#inputEmail3").val(), $("#inputPassword3").val(), $('input[name=gridRadios]:checked').val());
        if($("#inputUserName").val() !== "" && $("#inputEmail3").val() !== "" && $("#inputPassword3").val() !== "")
        {
            //send data to server for handle sing up
            $.ajax({
                type: "POST",
                url: "/singIn",
                data: userInformationObject,
                success: function (singUpResponse) {
                    if( typeof(singUpResponse) === "object")
                    {
                        if(singUpResponse.userName === "Repetitive" && singUpResponse.email === "Repetitive")
                        {
                            alert("این ایمیل و نام کار بری قبلا ثبت شده")
                        }
                        else if(singUpResponse.email === "Repetitive")
                        {
                            alert("این ایمیل قبلا ثبت شده")
                        }
                        else if(singUpResponse.userName === "Repetitive")
                        {
                            alert("این یوزن نیم قبلا بت شده")
                        }
                    }
                    else
                    {
                        alert("ثبت نام با موفقیت انحام شد");
                        window.location.href = window.location.origin + "/login"// change address bar to login page
                        $("html").html(singUpResponse);
                    }
                }
            });
        }
        else
        {
            alert("لطفا فیلد های خالی را چک کنید.")
        }
    });

});

//create object of user Information with this constructor
function userInfoConstructor(userName, email, password, gender) {
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.gender = gender
}