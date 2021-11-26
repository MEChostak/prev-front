var organizationList = (function () {
    'use strict';
    //var initialPage = 1;
    //var recordsPerPage = 10;

    const BASE_URL = "http://localhost:3600";

    var organizationList = {};

    organizationList.init = function () {
        //global.listProject($('#ddlProject'));

        organizationList.auth();
        organizationList.validateForm();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        organizationList.get();
    };

    organizationList.initEvents = function () {
        $('.btnSearchOrg').on('click', organizationList.search);
        $('.btnClearOrg').on('click', organizationList.clearForm);

        organizationList.setMask();
    };

    organizationList.setMask = function () {

    }

    organizationList.validateForm = function () {

    };

    organizationList.getFormData = function () {
        let data = {
            id: $('#input_id').val(),
            name: $('#input_name').val(),
            description: $('#input_description').val(),
            paymentStatus: $('#input_paymentStatus').val(),
            planId: $('#paymentStatus').val(),
        }

        return data;
    }

    organizationList.auth = function () {
        var token = localStorage.getItem('token')

        token == null ? location.href = '/' : null
    }

    organizationList.logout = function () {
        localStorage.clear()
        location.href = '/'
    }

    organizationList.cancel = function () {

        location.href = '/organization';
    }

    organizationList.clearForm = function () {
        document.getElementById('input_name').value = '';
        document.getElementById('input_paymentStatus').value = '';
        
        organizationList.get();
    }

    organizationList.get = function () {

        let data = organizationList.getFormData();
        //console.log(data);
        $.ajax({
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader('Content-Type', 'application/json');
                xhrObj.setRequestHeader('Accept', 'application/json');
                xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
            },
            method: 'POST',
            url: `${BASE_URL}/organization/list/1`,
            data: JSON.stringify(data),
            contentType: 'application/json'
        })
            .done(function (data) {
                console.log(data);

                let rows = "";
                for (let i = 0; i < data.info.totalRows; i++) {
                    rows += '<tr>';
                    rows += '   <td>';
                    rows += data.elements[i].name;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows += data.elements[i].description;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows += data.elements[i].paymentStatus;
                    rows += '    </td>';
                    // rows += '    <td>';
                    // rows += data.elements[i].planId;
                    // rows += '    </td>';
                    rows += '    <td>';
                    rows += '        <span class="label label-primary">Enabled</span>';
                    rows += '    </td>';
                    rows += '    <td class="text-right">';
                    rows += '        <div class="btn-group">';
                    rows += `            <a href="/organization/edit?id=${data.elements[i].id}" class="btn-white btn btn-xs"><i class="fa fa-search"></i> View</a>`;
                    rows += `            <a href="/organization/edit?id=${data.elements[i].id}" class="btn-white btn btn-xs"><i class="fa fa-edit"></i> Edit</a>`;
                    rows += '            <a data-id="' + data.elements[i].id + '"class="btn-white btn btn-xs btnRemove"><i class="far fa-trash-alt"></i> Delete</a>';
                    rows += '        </div>';
                    rows += '    </td>';
                    rows += '</tr>';
                }

                $('#table_organization').html(rows);

                $('.btnRemove').on('click', organizationList.remove);
            })
            .fail(function (err) {
                //console.log(err);
                toastr.error('Falha ao listar as organizações!');
                return false;
            });
    };

    organizationList.search = function () {

        let data = organizationList.getFormData();
        //console.log(data);
        $.ajax({
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader('Content-Type', 'application/json');
                xhrObj.setRequestHeader('Accept', 'application/json');
                xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
            },
            method: 'POST',
            url: `${BASE_URL}/organization/list/1`,
            data: JSON.stringify(data),
            contentType: 'application/json'
        })
            .done(function (data) {
                console.log(data);

                let rows = "";
                for (let i = 0; i < data.info.totalRows; i++) {
                    rows += '<tr>';
                    rows += '   <td>';
                    rows += data.elements[i].name;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows += data.elements[i].description;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows += data.elements[i].paymentStatus;
                    rows += '    </td>';
                    // rows += '    <td>';
                    // rows += data.elements[i].planId;
                    // rows += '    </td>';
                    rows += '    <td>';
                    rows += '        <span class="label label-primary">Enabled</span>';
                    rows += '    </td>';
                    rows += '    <td class="text-right">';
                    rows += '        <div class="btn-group">';
                    rows += `            <a href="/organization/edit?id=${data.elements[i].id}" class="btn-white btn btn-xs"><i class="fa fa-search"></i> View</a>`;
                    rows += `            <a href="/organization/edit?id=${data.elements[i].id}" class="btn-white btn btn-xs"><i class="fa fa-edit"></i> Edit</a>`;
                    rows += '            <a data-id="' + data.elements[i].id + '"class="btn-white btn btn-xs btnRemove"><i class="far fa-trash-alt"></i> Delete</a>';
                    rows += '        </div>';
                    rows += '    </td>';
                    rows += '</tr>';
                }

                $('#table_organization').html(rows);

                $('.btnRemove').on('click', organizationList.remove);
            })
            .fail(function (err) {
                //console.log(err);
                toastr.error('Falha ao listar as organizações!');
                return false;
            });
    };

    organizationList.remove = function () {
        var id = $(this).attr('data-id');

        $.ajax({
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader('Content-Type', 'application/json');
                xhrObj.setRequestHeader('Accept', 'application/json');
                xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
            },
            method: 'DELETE',
            url: `${BASE_URL}/organization/delete/${id}`,
            // data: JSON.stringify({id}),
            contentType: 'application/json'
        })
            .done(function (data) {
                toastr.success('Organização deletado!')
                organizationList.search()
            })
            .fail(function (err) {
                toastr.error('Falha ao deletar Organização!');
                return false;
            });
    };

    return organizationList;
})();

organizationList.init();
organizationList.initEvents();