var tableEdit = (function () {
    'use strict';
    //var initialPage = 1;
    //var recordsPerPage = 10;

    const BASE_URL = "http://localhost:3600";

    var tableEdit = {};

    tableEdit.init = function () {
        //global.listProject($('#ddlProject'));

        tableEdit.auth();
        tableEdit.validateForm();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')

        if (id !== null) tableEdit.get(id);

    };

    tableEdit.initEvents = function () {
        $('.btnSave').on('click', tableEdit.save);
        $('.btnCancel').on('click', tableEdit.cancel);

        tableEdit.setMask();
    };

    tableEdit.setMask = function () {

    }

    tableEdit.validateForm = function () {
        $('#form_table').validate({
            rules: {
                input_mouth: {
                    required: true,
                    minlength: 2
                },
                input_year: {
                    required: true,
                    minlength: 4
                },
                input_value: {
                    required: true
                }
            },
            messages: {
                input_mouth: {
                    required: "Informe um mês!",
                    minlength: "Informe um mês com dois caracteres, ex. 01"
                },
                input_year: {
                    required: "Informe o ano com quatro caracteres, ex. 2021!"
                },
                input_value: {
                    required: "Informe a taxa!"
                }
            }
        });
    };

    tableEdit.setFormData = function (data) {
        $('#input_id').val(data.id);
        $('#input_mouth').val(data.mouth);
        $('#input_year').val(data.year);
        $('#input_value').val(data.value);
    }

    tableEdit.getFormData = function () {
        let data = {
            id: $('#input_id').val(),
            mouth: $('#input_mouth').val(),
            year: $('#input_year').val(),
            value: $('#input_value').val(),
        }

        return data;
    }

    tableEdit.auth = function () {
        var token = localStorage.getItem('token')

        token == null ? location.href = '/' : null
    }

    tableEdit.logout = function () {
        localStorage.clear()
        location.href = '/'
    }

    tableEdit.cancel = function () {
        location.href = '/table';
    }

    tableEdit.get = function (id) {
        $.ajax({
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader('Content-Type', 'application/json');
                xhrObj.setRequestHeader('Accept', 'application/json');
                xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
            },
            method: 'GET',
            url: `${BASE_URL}/table/show/${id}`,
            contentType: 'application/json'
        })
            .done(function (data) {
                tableEdit.setFormData(data.data);
            })
            .fail(function (err) {
                console.log(err);
                toastr.error("Falha ao carregar tabela!");
                return false;
            });
    }


    tableEdit.save = function (event) {
        event.preventDefault();

        if ($('#form_table').valid()) {
            let data = tableEdit.getFormData();
            console.log("aqui", data);
            $.ajax({
                beforeSend: function (xhrObj) {
                    xhrObj.setRequestHeader('Content-Type', 'application/json');
                    xhrObj.setRequestHeader('Accept', 'application/json');
                    xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
                },
                method: (data.id !== '' ? 'PATCH' : 'POST'),
                url: (data.id !== '' ? `${BASE_URL}/table/update/${data.id}` : `${BASE_URL}/table/store`),
                data: JSON.stringify(data),
                contentType: 'application/json'
            })
                .done(function (data) {
                    console.log(data);
                    $('#input_id').val(data.id);
                    toastr.success('Table salvo com sucesso!');
                    tableEdit.cancel()

                })
                .fail(function (err) {
                    console.log(err);
                    toastr.error('Falha ao salvar tabela!');
                    return false;
                });
        }
    };

    return tableEdit;
})();

tableEdit.init();
tableEdit.initEvents();