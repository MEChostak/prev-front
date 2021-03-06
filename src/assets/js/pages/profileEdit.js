var profileEdit = (function () {
    'use strict';
    //var initialPage = 1;
    //var recordsPerPage = 10;

    const BASE_URL = "http://localhost:3600";

    var profileEdit = {};

    profileEdit.init = function () {
        //global.listProject($('#ddlProject'));

        profileEdit.auth();
        profileEdit.validateForm();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')

        if (id !== null) profileEdit.get(id);
    };

    profileEdit.initEvents = function () {
        $('.btnSave').on('click', profileEdit.save);
        $('.btnCancel').on('click', profileEdit.cancel);

        profileEdit.setMask();
    };

    profileEdit.setMask = function () {

    }

    profileEdit.validateForm = function () {
        $('#form_person').validate({
            rules: {
                input_name: {
                    required: true,
                    minlength: 2
                },
                input_birthDate: {
                    required: true,
                },
                input_description: {
                    required: true,
                },
                input_phone: {
                    required: true,
                },
                input_email: {
                    required: true,
                },
            },
            messages: {
                input_name: {
                    required: 'Informe um nome válido!',
                    minlength: 'Informe um nome com mais de dois caracteres'
                },
                input_birthDate: {
                    required: 'Informe uma data válida',
                },
                input_description: {
                    required: 'Informe uma descrição',
                },
                input_phone: {
                    required: 'Informe um telefone',
                },
                input_email: {
                    required: 'Informe um Email valido',
                }
            }
        });
    };

    profileEdit.setFormData = function (data) {
        $('#input_id').val(data.id);
        $('#input_name').val(data.name);
        $('#input_birthDate').val(data.birthDate);
        $('#input_description').val(data.description);
        $('#input_phone').val(data.phone);
        $('#input_mail').val(data.mail);
    }

    profileEdit.getFormData = function () {
        let data = {
            id: $('#input_id').val(),
            name: $('#input_name').val(),
            birthDate: $('#input_birthDate').val(),
            description: $('#input_description').val(),
            phone: $('#input_phone').val(),
            mail: $('#input_mail').val(),
        }

        return data;
    }

    profileEdit.auth = function () {
        var token = localStorage.getItem('token')

        token == null ? location.href = '/' : null
    }

    profileEdit.logout = function () {
        localStorage.clear()
        location.href = '/'
    }

    profileEdit.cancel = function () {
        location.href = '/profile';
    }

    profileEdit.get = function (id) {
        $.ajax({
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader('Content-Type', 'application/json');
                xhrObj.setRequestHeader('Accept', 'application/json');
                xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
            },
            method: 'GET',
            url: `${BASE_URL}/person/show/${id}`,
            contentType: 'application/json'
        })
            .done(function (data) {
                profileEdit.setFormData(data.data);
            })
            .fail(function (err) {
                console.log(err);
                toastr.error("Falha ao carregar usuário!");
                return false;
            });
    }

    profileEdit.save = function (event) {
        event.preventDefault();

        if ($('#form_profile').valid()) {
            let data = profileEdit.getFormData();
            console.log(data);
            $.ajax({
                beforeSend: function (xhrObj) {
                    xhrObj.setRequestHeader('Content-Type', 'application/json');
                    xhrObj.setRequestHeader('Accept', 'application/json');
                    xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
                },
                method: (data.id !== '' ? 'PATCH' : 'POST'),
                url: (data.id !== '' ? `${BASE_URL}/person/update/${data.id}` : `${BASE_URL}/person/store`),
                data: JSON.stringify(data),
                contentType: 'application/json'
            })
                .done(function (data) {
                    console.log(data);
                    profileEdit.cancel()
                    $('#input_id').val(data.data.id);
                    toastr.success('Perfil salvo com sucesso!');

                })
                .fail(function (err) {
                    console.log(err);
                    toastr.error('Falha ao salvar perfil!');
                    return false;
                });
        }
    };

    return profileEdit;
})();

profileEdit.init();
profileEdit.initEvents();