var calcEdit = (function() {
    'use strict';
    //var initialPage = 1;
    //var recordsPerPage = 10;

    const BASE_URL = "http://localhost:3600";

    var calcEdit = {};

    calcEdit.init = function() {
        //global.listProject($('#ddlProject'));
        // $('.dropify').dropify();
        // $('.dropify-message > p').html('Insira aqui a sua planilha (arrastando para o box ou clicando)<br/><br/> ATENCÃO! Use o Modelo');

        calcEdit.auth();
        calcEdit.validateForm();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')

        if (id !== null) calcEdit.get(id);

        // calcEdit.organization();
    };

    calcEdit.initEvents = function() {
        $('.btnSave').on('click', calcEdit.save);
        $('.btnCancel').on('click', calcEdit.cancel);
        $('.btnRegister').on('click', calcEdit.register)

        calcEdit.setMask();

        // $('.dropify').dropify();
        // $('.dropify-message > p').html('Insira aqui a sua planilha (arrastando para o box ou clicando)<br/><br/> ATENCÃO! Use o Modelo');

    };

    calcEdit.setMask = function() {

    }
    calcEdit.register = function() {

        if (!$('#pdf')[0].files[0]) {
            toastr.error('Selecione um arquivo para upload!')
            return
        }

        if (!$('#pdf')[0].files[0].name.includes('.pdf')) {
            toastr.error('O arquivo deve ser PDF.')
            return
        }


        $.ajax({
                beforeSend: function(xhrObj) {
                    xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
                },
                method: 'POST',
                url: `${BASE_URL}/pdf/bulk`,
                data: formData,
                contentType: false,
                processData: false
            })
            .done(function(data) {
                toastr.success('Arquivo enviado!');
            })
            .fail(function(err) {
                console.log(err);
                toastr.error('Falha ao enviar arquivo!');
                return false;
            });


    }

    calcEdit.validateForm = function() {
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
                    email: true

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
                    required: "Selecione o status!"
                }
            }
        });
    };

    calcEdit.setFormData = function(data) {
        $('#input_id').val(data.id);
        $('#input_name').val(data.name);
        $('#input_email').val(data.mail);
        $('#organization_select').val(data.organizationId);
        $('#select_person').val(data.ṕersonId);
    }

    calcEdit.getFormData = function() {
        let data = {
            id: $('#input_id').val(),
            name: $('#input_name').val(),
            mail: $('#input_email').val(),
            password: $('#input_password').val(),
            organizationId: $('#organization_select').val(),
            personId: $('#select_person').val(),
        }

        return data;
    }

    calcEdit.auth = function() {
        var token = localStorage.getItem('token')

        token == null ? location.href = '/' : null
    }

    calcEdit.logout = function() {
        localStorage.clear()
        location.href = '/'
    }

    calcEdit.cancel = function() {
        location.href = '/user';
    }

    calcEdit.get = function(id) {
        $.ajax({
                beforeSend: function(xhrObj) {
                    xhrObj.setRequestHeader('Content-Type', 'application/json');
                    xhrObj.setRequestHeader('Accept', 'application/json');
                    xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
                },
                method: 'GET',
                url: `${BASE_URL}/user/show/${id}`,
                contentType: 'application/json'
            })
            .done(function(data) {
                calcEdit.setFormData(data.data);
            })
            .fail(function(err) {
                console.log(err);
                toastr.error("Falha ao carregar usuário!");
                return false;
            });
    }

    // calcEdit.organization = function() {

    //     $.ajax({
    //             beforeSend: function(xhrObj) {
    //                 xhrObj.setRequestHeader('Content-Type', 'application/json');
    //                 xhrObj.setRequestHeader('Accept', 'application/json');
    //                 xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
    //             },
    //             method: 'POST',
    //             url: `${BASE_URL}/organization/list/1`,
    //             data: JSON.stringify({}),
    //             contentType: 'application/json'
    //         })
    //         .done(function(data) {
    //             // console.log(data)
    //             let organizationList = []
    //             let selectBox = document.getElementById("organization_select").options
    //             for (var i = 0; i < data.elements.length; i++) {
    //                 organizationList.push(data.elements[i])
    //             }
    //             organizationList.forEach(option =>
    //                     selectBox.add(
    //                         new Option(option.name, option.id)
    //                     )
    //                 )
    //                 // console.log(organizationList)
    //         })
    //         .fail(function(err) {
    //             //console.log(err);
    //             toastr.error('Falha ao listar organização!');
    //             return false;
    //         });
    // };

    calcEdit.save = function(event) {
        event.preventDefault();

        if ($('#form_user').valid()) {
            let data = calcEdit.getFormData();
            console.log("aqui", data);
            $.ajax({
                    beforeSend: function(xhrObj) {
                        xhrObj.setRequestHeader('Content-Type', 'application/json');
                        xhrObj.setRequestHeader('Accept', 'application/json');
                        xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
                    },
                    method: (data.id !== '' ? 'PATCH' : 'POST'),
                    url: (data.id !== '' ? `${BASE_URL}/user/update/${data.id}` : `${BASE_URL}/user/store`),
                    data: JSON.stringify(data),
                    contentType: 'application/json'
                })
                .done(function(data) {
                    console.log(data);
                    calcEdit.cancel()
                    $('#input_id').val(data.data.id);
                    toastr.success('Usuário salvo com sucesso!');

                })
                .fail(function(err) {
                    console.log(err);
                    toastr.error('Falha ao salvar usuário!');
                    return false;
                });
        }
    };

    return calcEdit;
})();

calcEdit.init();
calcEdit.initEvents();