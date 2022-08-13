function user(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
}
$('#register').on('submit', function (e) {
    e.preventDefault();
    var username = $('#username').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var comfirmpassword = $('#confirmpassword').val();
    var agree = $('input[name="agree"]:checked');
    if (comfirmpassword == password) {
        var new_user = new user(username, email, password);
        console.log(new_user);
        var lst_user = JSON.parse(localStorage.getItem('lst_usr'));
        if (lst_user == null) {
            lst_user = [];
        }
        lst_user.push(new_user);
        localStorage.setItem('lst_usr', JSON.stringify(lst_user));
        this.reset();
        alert('Register successfully');
        $.ajax({
            url: '../home.html',
            type: 'GET',
            dataType: 'html',
            success: function (data) {
                $('.body').html(data)
            }
        })
    } else {
        alert('Password is not match');
    }
});

// login ajax
$('.to_login').click(function () {
    $.ajax({
        url: '../login.html',
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            $('.body').html(data);
        }

    })
})
