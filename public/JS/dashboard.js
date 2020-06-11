$(document).ready(function () {
    
    let thisUser = {nameForSingOut: $("#userName").text()};

    $("#out").click(function () {
        $.ajax({
            type: "POST",
            url: "/singOut",
            data: thisUser,
            success: function (singOutResponse) {
                alert("شما خارج شدید");
                window.location.href = window.location.origin + "/login"// change address bar to login page
                $("html").html(singOutResponse);
            }
        });
    });

    let select;
    let temp;
    let CurrentUserObj;
    let lastUserName;
    let isEditMode = false;
    $("#edit").click(function () {
        if(isEditMode === false)
        {
            isEditMode = true;
            lastUserName = $("#userName").text();
            CurrentUserObj = new creatObjectOfUser($("#userName").text(), $("#email").text(), $("#password").text(), $("#gender").text());
            
            select = document.getElementsByClassName("value");
            for(let i=0; i<(select.length-1); i++)
            {
                temp = select[i].textContent;
                select[i].innerHTML = `<input class="${select[i].id}" value="${temp}"></input>`
            }
            $(".panel-buttons").css({"display":"block", "display":"flex"});
        }
    });

    $(".cancel-edit").click(function () {
        isEditMode = false;

        $("#userName").html( userObj.userName );
        $("#email").html( userObj.email );
        $("#password").html( userObj.password);
        $("#gender").html( userObj.gender );

        $(".panel-buttons").css({"display":"none"});
    })

    $(".submit-edit").click(function () {
        CurrentUserObj = new creatObjectOfUser($(".userName").val(), $(".email").val(), $(".password").val(), $(".gender").val());
        CurrentUserObj.lastUserName = lastUserName;

        $.ajax({
            type: "PUT",
            url: "/update",
            data: CurrentUserObj,
            success: function (updateResponse) {
                alert("ویرایش با موفقیت انجام شد");
                window.location.href = window.location.origin + "/login"// change address bar to login page
            }
        });
    });

});

function creatObjectOfUser(userName, email, password, gender) {
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.gender = gender;
}