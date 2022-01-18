var userList = (function() {
    'use strict';
    //var initialPage = 1;
    //var recordsPerPage = 10;

    const BASE_URL = "http://localhost:3600";

    var userList = {};

    userList.init = function() {
        //global.listProject($('#ddlProject'));

        userList.auth();
        userList.validateForm();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        userList.get();
        userList.organization();
    };

    userList.initEvents = function() {
        $('.btnSearchUser').on('click', userList.search);
        $('.btnClearUser').on('click', userList.clearForm);

        userList.setMask();
    };

    userList.setMask = function() {

    }

    userList.validateForm = function() {

    };

    userList.getFormData = function() {
        let data = {
            name: $('#input_name').val(),
            mail: $('#input_email').val(),
            // organizationId: $('#select_organization').val(),
            // profileId: $('#select_profile').val(),
        }
        console.log(data)
        return data;
    }

    userList.auth = function() {
        var token = localStorage.getItem('token')

        token == null ? location.href = '/' : null
    }

    userList.logout = function() {
        localStorage.clear()
        location.href = '/'
    }

    userList.cancel = function() {
        location.href = '/user';
    }

    userList.clearForm = function() {
        document.getElementById('input_name').value = '';
        document.getElementById('input_email').value = '';
        document.getElementById('select_organization').value = '';
        document.getElementById('select_profile').value = '';
        document.getElementById('input_status').value = '';
        userList.get();
    }

    userList.get = function() {

        let data = userList.getFormData();
        // console.log("chamei", data);
        $.ajax({
                beforeSend: function(xhrObj) {
                    xhrObj.setRequestHeader('Content-Type', 'application/json');
                    xhrObj.setRequestHeader('Accept', 'application/json');
                    xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
                },
                method: 'POST',
                url: `${BASE_URL}/user/list/1`,
                data: JSON.stringify(data),
                contentType: 'application/json'
            })
            .done(function(data) {
                console.log(data);

                let rows = "";
                for (let i = 0; i < data.elements.length; i++) {
                    rows += '<tr>';
                    rows += '   <td>';
                    rows += data.elements[i].name;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows += data.elements[i].mail;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows += data.elements[i].personId;
                    rows += '    </td>';
                    rows += '    <td>';
                    // rows +=         data.elements[i].organization.name;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows += '        <span class="label label-primary">Enabled</span>';
                    rows += '    </td>';
                    rows += '    <td class="text-right">';
                    rows += '        <div class="btn-group">';
                    // rows += `            <a href="/user/edit?id=${data.elements[i].id}" class="btn-white btn btn-xs"><i class="fa fa-search"></i> View</a>`;
                    rows += '            <a href="/user/edit?id=' + data.elements[i].id + '" class="btn-white btn btn-xs"><i class="fa fa-edit"></i> Edit</a>';
                    rows += '            <a data-id="' + data.elements[i].id + '"class="btn-white btn btn-xs btnRemove"><i class="far fa-trash-alt"></i> Delete</a>';
                    rows += '        </div>';
                    rows += '    </td>';
                    rows += '</tr>';
                }

                $('#table_user').html(rows);

                $('.btnRemove').on('click', userList.remove);
            })
            .fail(function(err) {
                //console.log(err);
                toastr.error('Falha ao listar usuários!');
                return false;
            });
    }

    userList.search = function() {

        let data = userList.getFormData();
        console.log("chamei", data);
        $.ajax({
                beforeSend: function(xhrObj) {
                    xhrObj.setRequestHeader('Content-Type', 'application/json');
                    xhrObj.setRequestHeader('Accept', 'application/json');
                    xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
                },
                method: 'POST',
                url: `${BASE_URL}/user/list/1`,
                data: JSON.stringify(data),
                contentType: 'application/json'
            })
            .done(function(data) {
                console.log(data);

                let rows = "";
                for (let i = 0; i < data.elements.length; i++) {
                    rows += '<tr>';
                    rows += '   <td>';
                    rows += data.elements[i].name;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows += data.elements[i].mail;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows += data.elements[i].personId;
                    rows += '    </td>';
                    rows += '    <td>';
                    // rows += data.elements[i].organization;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows += '        <span class="label text-right label-primary">Enabled</span>';
                    rows += '    </td>';
                    rows += '    <td class="text-right">';
                    rows += '        <div class="btn-group">';
                    // rows += `            <a href="/user/edit?id=${data.elements[i].id}" class="btn-white btn btn-xs"><i class="fa fa-search"></i> View</a>`;
                    rows += '            <a href="/user/edit?id=' + data.elements[i].id + '" class="btn-white btn btn-xs"><i class="fa fa-edit"></i> Edit</a>';
                    rows += '            <a data-id="' + data.elements[i].id + '"class="btn-white btn btn-xs btnRemove"><i class="far fa-trash-alt"></i> Delete</a>';
                    rows += '        </div>';
                    rows += '    </td>';
                    rows += '</tr>';
                }

                $('#table_user').html(rows);

                $('.btnRemove').on('click', userList.remove);
            })
            .fail(function(err) {
                //console.log(err);
                toastr.error('Falha ao listar usuários!');
                return false;
            });
    }

    userList.remove = function() {
        var id = $(this).attr('data-id');
        console.log(id)
        $.ajax({
                beforeSend: function(xhrObj) {
                    xhrObj.setRequestHeader('Content-Type', 'application/json');
                    xhrObj.setRequestHeader('Accept', 'application/json');
                    xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
                },
                method: 'DELETE',
                url: `${BASE_URL}/user/delete/${id}`,
                data: JSON.stringify({ id }),
                contentType: 'application/json'
            })
            .done(function(data) {
                toastr.success('Usuário deletado!')
                userList.search()
            })
            .fail(function(err) {
                toastr.error('Falha ao deletar Usuário!');
                return false;
            });
    }

    userList.organization = function() {

        $.ajax({
                beforeSend: function(xhrObj) {
                    xhrObj.setRequestHeader('Content-Type', 'application/json');
                    xhrObj.setRequestHeader('Accept', 'application/json');
                    xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
                },
                method: 'POST',
                url: `${BASE_URL}/organization/list/1`,
                data: JSON.stringify({}),
                contentType: 'application/json'
            })
            .done(function(data) {
                console.log(data)
                let organizationList = []
                let selectBox = document.getElementById("select_organization").options
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
            .fail(function(err) {
                //console.log(err);
                toastr.error('Falha ao listar organização!');
                return false;
            });
    };


    return userList;
})();

userList.init();
userList.initEvents();