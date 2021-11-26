var login = (function () {
    'use strict';
    //var initialPage = 1;
    //var recordsPerPage = 10;

    const BASE_URL = "http://localhost:3600";

    var login = {};

    login.init = function () {
        //global.listProject($('#ddlProject'));

        login.validateForm();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);


    };

    login.initEvents = function () {
        $('.btnLogin').on('click', login.login);


        login.setMask();
    };

    login.setMask = function () {

    }

    login.validateForm = function () {
        $('#formLogin').validate({
            rules: {
                email: {
                    required: true,
                },
                password: {
                    required: true
                }
            },
            messages: {
                email: {
                    required: "Entre com um email!",
                },
                password: {
                    required: "Digite sua senha!",
                }
            }
        });
    };

    login.getFormData = function () {
        let data = {
            email: $('#input_email').val(),
            password: $('#input_password').val()
        }

        return data;
    }

    login.enter = function () {
        location.href = '/dashboard';
    }


    login.login = function (e) {
        e.preventDefault();

        let data = login.getFormData();
        $.ajax({
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader('Content-Type', 'application/json');
                xhrObj.setRequestHeader('Accept', 'application/json');
                // xhrObj.setRequestHeader('x-access-token', main.getCookie('token'));
            },
            method: 'POST',
            url: `${BASE_URL}/user/login`,
            data: JSON.stringify(data),
            contentType: 'application/json'
        })
            .done(function (data) {
                // console.log(data)
                if (data.ok == true) {
                    localStorage.setItem('name', data.name)
                    localStorage.setItem('id', data.id)
                    localStorage.setItem('token', data.token)

                    login.enter();
                    return;
                }
                else {
                    toastr.error('Dados incorretos! Tente novamente.');
                    return;
                }
            })
            .fail(function (err) {
                toastr.error('Dados incorretos! Tente novamente.');
                return false;
            });
    }

    return login;
})();

login.init();
login.initEvents();