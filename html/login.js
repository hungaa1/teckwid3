$(document).ready(function () {
    const form = document.querySelector(".login");
    let checkLogin = 0;
    $(form).submit(function (e) {
        e.preventDefault();
        var data = new FormData(e.target)
        var use_lst = JSON.parse(localStorage.getItem("lst_usr"))
        console.log(use_lst)
        var email = data.get("email")
        var password = data.get("password")
        console.log(email, password)

        $(use_lst).each(function (index, val) {
            if (val.email == email && val.password == password) {
                checkLogin = 1;
            }
        })
        if (checkLogin == 1) {
            alert('Login successfully');
            $.ajax({
                url: '../home.html',
                type: 'GET',
                dataType: 'html',
                success: function (data) {
                    $('.body').html(data)
                }
            })
        } else {
            alert('Email or password is incorrect');
        }

    })
})

//  register ajax
$('.to_register').click(function () {
    $.ajax({
        url: '../register.html',
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            $('.body').html(data);
        }

    })
})
