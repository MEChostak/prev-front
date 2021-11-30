var organizationEdit = (function () {
    'use strict';
    //var initialPage = 1;
    //var recordsPerPage = 10;

    const BASE_URL = "http://localhost:3600";

    var organizationEdit = {};

    organizationEdit.init = function () {
        //global.listProject($('#ddlProject'));

        organizationEdit.auth();
        organizationEdit.validateForm();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')

        if (id !== null) organizationEdit.get(id);
    };

    organizationEdit.initEvents = function () {
        $('.btnSave').on('click', organizationEdit.save);
        $('.btnCancel').on('click', organizationEdit.cancel);

        organizationEdit.setMask();
    };

    organizationEdit.setMask = function () {
        // $('#input_description').mask('00/00/0000');
    }

    organizationEdit.validateForm = function () {
        $('#form_organization').validate({
            rules: {
                input_name: {
                    required: true,
                    minlength: 2
                },
                input_description: {
                    required: true,
                    minlength: 2
                },
                paymentStatus: {
                    required: true
                }
            },
            messages: {
                input_name: {
                    required: "Informe um nome válido!",
                    minlength: "Informe um nome com mais de dois caractares"
                },
                input_description: {
                    required: "Informe uma descrição válida!",
                    minlength: "Informe uma descrição com mais de dois caractares"
                },
                paymentStatus: {
                    required: "Selecione uma opção!",
                    
                }, 
            }
        });
    };

    organizationEdit.setFormData = function (data) {
        console.log(data)
        $('#input_id').val(data.id);
        $('#input_name').val(data.name);
        $('#input_descripition').val(data.description);
        $('#paymentStatus').val(data.paymentStatus);
        $('#planId').val(data.planId);
    }

    organizationEdit.getFormData = function () {
        let data = {
            id: $('#input_id').val(),
            name: $('#input_name').val(),
            description: $('#input_description').val(),
            paymentStatus: $('#paymentStatus').val(),
            planId: $('#paymentStatus').val(),
        }

        return data;
    }

    organizationEdit.auth = function () {
        var token = localStorage.getItem('token')

        token == null ? location.href = '/' : null
    }

    organizationEdit.logout = function () {
        localStorage.clear()
        location.href = '/'
    }

    organizationEdit.cancel = function () {
        location.href = '/organization';
    }

    organizationEdit.get = function (id) {
        $.ajax({
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader('Content-Type', 'application/json');
                xhrObj.setRequestHeader('Accept', 'application/json');
                xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
            },
            method: 'GET',
            url: `${BASE_URL}/organization/show/${id}`,
            contentType: 'application/json'
        })
            .done(function (data) {
                organizationEdit.setFormData(data.data);
            })
            .fail(function (err) {
                console.log(err);
                toastr.error("Falha ao carregar organização!");
                return false;
            });
    }

    organizationEdit.save = function (event) {
        event.preventDefault();

        if ($('#form_organization').valid()) {
            let data = organizationEdit.getFormData();
            console.log(data);
            $.ajax({
                beforeSend: function (xhrObj) {
                    xhrObj.setRequestHeader('Content-Type', 'application/json');
                    xhrObj.setRequestHeader('Accept', 'application/json');
                    xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
                },
                method: (data.id !== '' ? 'PATCH' : 'POST'),
                url: (data.id !== '' ? `${BASE_URL}/organization/update/${data.id}` : `${BASE_URL}/organization/store`),
                data: JSON.stringify(data),
                contentType: 'application/json'
            })
                .done(function (data) {
                    console.log(data);
                    toastr.success('Organização salva com sucesso');
                    organizationEdit.cancel()
                })
                .fail(function (err) {
                    console.log(err);
                    toastr.error('Falha ao salvar organização');
                    console.log(err);
                    return false;
                });
        }
    };

    return organizationEdit;
})();

organizationEdit.init();
organizationEdit.initEvents();