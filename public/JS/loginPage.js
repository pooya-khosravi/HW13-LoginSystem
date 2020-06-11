$(document).ready(function () {
    
    /**
     * click on submit button and check condition
     * first check unvalid inputs
     * second send a req to server
     * third check use and pas
     * and get response and show result
     */
    $("#loginButton").click(function () {
        //first check unvalid inputs
        if($("#customUsername").val() === "" && $("#customPassword").val() === "" )
        {
            $(".invalid-feedback").css("display","block");
        }
        else if($("#customUsername").val() === "" && $("#customPassword").val() !== "")
        {
            $("#userFeedBack").css("display","block");
        }
        else if($("#customUsername").val() !== "" && $("#customPassword").val() === "")
        {
            $("#passFeedBack").css("display","block");
        }
    });

    //check input display for hide massage 
    $("#customUsername").keydown(function () { 
        if($("#userFeedBack").css("display") === "block")
        {
            $("#userFeedBack").css("display","none");
        }
    });

    $("#customPassword").keydown(function () { 
        if($("#passFeedBack").css("display") === "block")
        {
            $("#passFeedBack").css("display","none");
        }
    });

});