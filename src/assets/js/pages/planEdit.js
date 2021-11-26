var planEdit = (function () {
    'use strict';
    //var initialPage = 1;
    //var recordsPerPage = 10;

    const BASE_URL = "http://localhost:3600";

    var planEdit = {};

    planEdit.init = function () {
        //global.listProject($('#ddlProject'));

        planEdit.auth();
        planEdit.validateForm();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id')
        
        if (id !== null) planEdit.get(id);
    };

    planEdit.initEvents = function () {
        $('.btnSave').on('click', planEdit.save);
        $('.btnClear').on('click', planEdit.clear);

        planEdit.setMask();
    };

    planEdit.setMask = function () {
      
    }

    planEdit.validateForm = function () {
        
    };

    planEdit.setFormData = function (data) {
        $('#input_id').val(data.id);
        $('#input_name').val(data.name);
        $('#input_description').val(data.description);
        $('#input_price').val(data.price);
        $('#input_timeCourse').val(data.timeCourse);
    }

    planEdit.getFormData = function () {
        let data = {
            id: $('#input_id').val(),
            name: $('#input_name').val(),
            description: $('#input_description').val(),
            price: $('#input_price').val(),
            timeCourse: $('#input_timeCourse').val(),
        }

        return data;
    }

    planEdit.auth = function () {
        var token = localStorage.getItem('token')

        token == null ? location.href = '/' : null
    }

    planEdit.logout = function () {
        localStorage.clear()
        location.href = '/'
    }

    planEdit.cancel = function () {

        location.href = '/plan';
    }


    planEdit.get = function (id) {
        $.ajax({
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader('Content-Type', 'application/json');
                xhrObj.setRequestHeader('Accept', 'application/json');
                xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
            },
            method: 'GET',
            url: `${BASE_URL}/plan/show/${id}`,
            contentType: 'application/json'
        })
            .done(function (data) {
                planEdit.setFormData(data.data);
            })
            .fail(function (err) {
                console.log(err);
                toastr.error("Falha ao carregar o plano!");
                return false;
            });
    }

    planEdit.save = function (event) {
        event.preventDefault();

        if ($('#form_plan').valid()) {
            let data = planEdit.getFormData();
            console.log(data);
            $.ajax({
                beforeSend: function (xhrObj) {
                    xhrObj.setRequestHeader('Content-Type', 'application/json');
                    xhrObj.setRequestHeader('Accept', 'application/json');
                    xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
                },
                method: (data.id !== '' ? 'PATCH' : 'POST'),
                url: (data.id !== '' ? `${BASE_URL}/plan/update/${data.id}` : `${BASE_URL}/plan/store`),
                data: JSON.stringify(data),
                contentType: 'application/json'
            })
                .done(function (data) {
                    console.log(data);
                    planEdit.cancel()
                    $('#input_id').val(data.data.id);
                    toastr.success('Plano salvo com sucesso!');
                    
                })
                .fail(function (err) {
                    console.log(err);
                    toastr.error('Falha ao salvar o plano!');
                    return false;
                });
        }
    };

    return planEdit;
})();

planEdit.init();
planEdit.initEvents();