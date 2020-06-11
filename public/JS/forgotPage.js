$(document).ready(function () {
    
    $("#submit-email").click(function () {
        if($(".yourMail").val() !== "")
        {
            $.ajax({
                type: "POST",
                url: "/sendMail",
                data: {indentMail: `${$(".yourMail").val()}`},
                success: function (sendMailResponse) {
                    if(sendMailResponse === false)
                    {
                        alert("فردی با این ایمل ثبت نشده")
                    }
                    else
                    {
                        alert("پسوورد ارسال شد");
                        window.location.href = window.location.origin + "/login"// change address bar to login page
                        $("html").html(updateResponse);
                    }
                }
            });
        }
    })

});