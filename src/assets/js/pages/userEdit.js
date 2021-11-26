var userEdit = (function () {
    'use strict';
    //var initialPage = 1;
    //var recordsPerPage = 10;

    const BASE_URL = "http://localhost:3600";

    var userEdit = {};

    userEdit.init = function () {
        //global.listProject($('#ddlProject'));

        userEdit.auth();
        userEdit.validateForm();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        
        if (id !== null) userEdit.get(id);

        userEdit.organization();
    };

    userEdit.initEvents = function () {
        $('.btnSave').on('click', userEdit.save);
        $('.btnCancel').on('click', userEdit.cancel);

        userEdit.setMask();
    };

    userEdit.setMask = function () {
      
    }

    userEdit.validateForm = function () {
        $('#form_user').validate({
            rules: {
                organization_select: {
                    required: true
                },
                select_profile: {
                    required: true
                },
                input_name: {
                    required: true,
                    minlength: 2
                }, 
                input_email: {
                    required: true,
                    email:true

                },
                input_password: {
                    required: true,
                    minlength: 8
                }, 
                input_confirm_password: {
                    required: true
                },
                input_status: {
                    required: true
                }
            },
            messages: {
                organization_select: {
                    required: "Selecione uma Organização!",
                },
                select_profile: {
                    required: "Selecione um perfil!",
                },
                input_name: {
                    required: "Informe um nome válido!",
                    minlength: "Informe um nome com mais de dois caracteres"
                },
                input_email: {
                    required: "Informe um email!",
                    email: "Informe um email válido"
                },
                input_password: {
                    required: "Informe uma senha!",
                    minlength: "Informe um nome com mais de oito caracteres"
                },
                input_confirm_password: {
                    required: "Informe a confirmação da senha!"
                },
                input_status: {
                    required:"Selecione o status!"
                }
            }
        });
    };

    userEdit.setFormData = function (data) {
        $('#input_id').val(data.id);
        $('#input_name').val(data.name);
        $('#input_email').val(data.mail);
        $('#organization_select').val(data.organizationId);
        $('#select_profile').val(data.ṕrofileId);
    }

    userEdit.getFormData = function () {
        let data = {
            id: $('#input_id').val(),
            name: $('#input_name').val(),
            mail: $('#input_email').val(),
            password: $('#input_password').val(),
            organizationId: $('#organization_select').val(),
            profileId: $('#select_profile').val(),
        }

        return data;
    }
    
    userEdit.auth = function () {
        var token = localStorage.getItem('token')

        token == null ? location.href = '/' : null
    }

    userEdit.logout = function () {
        localStorage.clear()
        location.href = '/'
    }

    userEdit.cancel = function () {
        location.href = '/user';
    }

    userEdit.get = function (id) {
        $.ajax({
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader('Content-Type', 'application/json');
                xhrObj.setRequestHeader('Accept', 'application/json');
                xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
            },
            method: 'GET',
            url: `${BASE_URL}/user/show/${id}`,
            contentType: 'application/json'
        })
            .done(function (data) {
                userEdit.setFormData(data.data);
            })
            .fail(function (err) {
                console.log(err);
                toastr.error("Falha ao carregar usuário!");
                return false;
            });
    }

    userEdit.organization = function () {

        $.ajax({
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader('Content-Type', 'application/json');
                xhrObj.setRequestHeader('Accept', 'application/json');
                xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
            },
            method: 'POST',
            url: `${BASE_URL}/organization/list/1`,
            data: JSON.stringify({}),
            contentType: 'application/json'
        })
            .done(function (data) {
                console.log(data)
                let organizationList = []
                let selectBox = document.getElementById("organization_select").options
                for (var i = 0; i < data.elements.length; i++) {
                    organizationList.push(data.elements[i])
                }
                organizationList.forEach(option =>
                    selectBox.add(
                        new Option(option.name, option.id)
                    )
                )
                console.log(organizationList)
            })
            .fail(function (err) {
                //console.log(err);
                toastr.error('Falha ao listar organização!');
                return false;
            });
    };


    userEdit.save = function (event) {
        event.preventDefault();

        if ($('#form_user').valid()) {
            let data = userEdit.getFormData();
            console.log("aqui", data);
            $.ajax({
                beforeSend: function (xhrObj) {
                    xhrObj.setRequestHeader('Content-Type', 'application/json');
                    xhrObj.setRequestHeader('Accept', 'application/json');
                    xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
                },
                method: (data.id !== '' ? 'PATCH' : 'POST'),
                url: (data.id !== '' ? `${BASE_URL}/user/update/${data.id}` : `${BASE_URL}/user/store`),
                data: JSON.stringify(data),
                contentType: 'application/json'
            })
                .done(function (data) {
                    console.log(data);
                    userEdit.cancel()
                    $('#input_id').val(data.data.id);
                    toastr.success('Usuário salvo com sucesso!');
                    
                })
                .fail(function (err) {
                    console.log(err);
                    toastr.error('Falha ao salvar usuário!');
                    return false;
                });
        }
    };

    return userEdit;
})();

userEdit.init();
userEdit.initEvents();