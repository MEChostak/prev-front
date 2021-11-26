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
        // $('#form_user').validate({
        //     rules: {
        //         select_organization: {
        //             required: true
        //         },
        //         select_profile: {
        //             required: true
        //         },
        //         input_name: {
        //             required: true,
        //             minlength: 2
        //         }, 
        //         input_email: {
        //             required: true,

        //         },
        //         input_password: {
        //             required: true,
        //             minlength: 8
        //         }, 
        //         input_confirm_password: {
        //             required: true
        //         },
        //         input_status: {
        //             required: true
        //         }
        //     },
        //     messages: {
        //         select_organization: {
        //             required: "Selecione uma Organização!",
        //         },
        //         select_profile: {
        //             required: "Selecione um perfil!",
        //         },
        //         input_name: {
        //             required: "Informe um nome válido!",
        //             minlength: "Informe um nome com mais de dois caracteres"
        //         },
        //         input_email: {
        //             required: "Informe um email válido!",
        //         },
        //         input_password: {
        //             required: "Informe uma senha!",
        //             minlength: "Informe um nome com mais de oito caracteres"
        //         },
        //         input_confirm_password: {
        //             required: "Informe a confirmação da senha!"
        //         },
        //         input_status: {
        //             required:"Selecione o status!"
        //         }
        //     }
        // });
    };

    profileEdit.setFormData = function (data) {
        $('#input_id').val(data.id);
        $('#input_fullName').val(data.fullName);
        $('#input_nationality').val(data.nationality);
        $('#input_birthDate').val(data.birthDate);
        $('#input_weight').val(data.weight);
        $('#input_unit').val(data.unit);
        $('#input_comment').val(data.comment);
        $('#input_phone').val(data.phone);
        $('#input_mail').val(data.mail);
        $('#input_emergencyPhone').val(data.emergencyPhone);
        $('#input_address').val(data.address);
        $('#input_city').val(data.city);
        $('#input_country').val(data.country);
        $('#input_isCrewMember').val(data.isCrewMember);
        $('#input_isPassenger').val(data.isPassenger);
        $('#select_organization').val(data.organizationId);
        $('#input_url').val(data.url);
        $('#input_typePerson').val(data.typePerson);
        // document: []
    }

    profileEdit.getFormData = function () {
        let data = {
            id: $('#input_id').val(),
            fullName: $('#input_fullName').val(),
            nationality: $('#input_nationality').val(),
            birthDate: $('#input_birthDate').val(),
            weight: $('#input_weight').val(),
            unit: $('#input_unit').val(),
            comment: $('#input_comment').val(),
            phone: $('#input_phone').val(),
            mail: $('#input_mail').val(),
            emergencyPhone: $('#input_emergencyPhone').val(),
            address: $('#input_address').val(),
            city: $('#input_city').val(),
            country: $('#input_country').val(),
            isCrewMember: $('#input_isCrewMember').val(),
            isPassenger: $('#input_isPassenger').val(),
            organizationId: $('#select_organization').val(),
            url: $('#input_url').val(),
            typePerson: $('#input_typePerson').val(),
            // document: []
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