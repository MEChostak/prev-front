var profileList = (function () {
    'use strict';
    //var initialPage = 1;
    //var recordsPerPage = 10;

    const BASE_URL = "http://localhost:3600";

    var profileList = {};

    profileList.init = function () {
        //global.listProject($('#ddlProject'));

        profileList.auth();
        profileList.validateForm();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
       
        profileList.search();
    };

    profileList.initEvents = function () {
        $('.btnSave').on('click', profileList.save);
        $('.btnClear').on('click', profileList.clear);

        profileList.setMask();
    };

    profileList.setMask = function () {
      
    }

    profileList.validateForm = function () {
        
    };

    profileList.getFormData = function () {
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

    profileList.auth = function () {
        var token = localStorage.getItem('token')

        token == null ? location.href = '/' : null
    }

    profileList.logout = function () {
        localStorage.clear()
        location.href = '/'
    }

    profileList.cancel = function () {

        location.href = '/profile';
    }


    profileList.search = function () {
        
        let data = profileList.getFormData();
        //console.log(data);
        $.ajax({
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader('Content-Type', 'application/json');
                xhrObj.setRequestHeader('Accept', 'application/json');
                xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
            },
            method: 'POST',
            url: `${BASE_URL}/person/list/1`,
            data: JSON.stringify(data),
            contentType: 'application/json'
        })
            .done(function (data) {
                console.log(data);
                
                let rows = "";
                for (let i=0; i<data.info.totalRows; i++) {
                    rows += '<tr>';
                    rows += '   <td>';
                    rows +=         data.elements[i].name;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows +=         data.elements[i].mail;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows +=         data.elements[i].phone;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows += '        <span class="label label-primary">Enabled</span>';
                    rows += '    </td>';
                    rows += '    <td class="text-right">';
                    rows += '        <div class="btn-group">';
                    rows += `            <a href="/profile/edit?id=${data.elements[i].id}" class="btn-white btn btn-xs"><i class="fa fa-search"></i> View</a>`;
                    rows += '            <a href="/profile/edit?id='+data.elements[i].id+'" class="btn-white btn btn-xs"><i class="fa fa-edit"></i> Edit</a>';
                    rows += '            <a data-id="' + data.elements[i].id + '"class="btn-white btn btn-xs btnRemove"><i class="far fa-trash-alt"></i> Delete</a>';
                    rows += '        </div>';
                    rows += '    </td>';
                    rows += '</tr>';
                }

                $('#table_profile').html(rows);

                $('.btnRemove').on('click', profileList.remove);
            })
            .fail(function (err) {
                //console.log(err);
                toastr.error('Falha ao listar perfil!');
                return false;
            });
    }

    profileList.remove = function () {
        var id = $(this).attr('data-id');

        $.ajax({
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader('Content-Type', 'application/json');
                xhrObj.setRequestHeader('Accept', 'application/json');
                xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
            },
            method: 'DELETE',
            url: `${BASE_URL}/person/delete/${id}`,
            // data: JSON.stringify({id}),
            contentType: 'application/json'
        })
        .done(function (data) {
            toastr.success('Perfil excluido!') 
            profileList.search()
        })
        .fail(function (err) {
            toastr.error('Falha ao deletar perfil!');
            return false;
        });
    }

    return profileList;
})();

profileList.init();
profileList.initEvents();