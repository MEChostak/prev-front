var tableList = (function() {
    'use strict';
    //var initialPage = 1;
    //var recordsPerPage = 10;

    const BASE_URL = "http://localhost:3600";

    var tableList = {};

    tableList.init = function() {
        //global.listProject($('#ddlProject'));

        tableList.auth();
        tableList.validateForm();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        tableList.get();
    };

    tableList.initEvents = function() {
        $('.btnSearchUser').on('click', tableList.search);
        $('.btnClearUser').on('click', tableList.clearForm);

        tableList.setMask();
    };

    tableList.setMask = function() {

    }

    tableList.validateForm = function() {

    };

    tableList.getFormData = function() {
        let data = {
            mouth: $('#input_mouth').val(),
            year: $('#input_year').val(),
            value: $('#input_value').val(),
        }

        return data;
    }

    tableList.auth = function() {
        var token = localStorage.getItem('token')

        token == null ? location.href = '/' : null
    }

    tableList.logout = function() {
        localStorage.clear()
        location.href = '/'
    }

    tableList.cancel = function() {
        location.href = '/table';
    }

    tableList.clearForm = function() {
        document.getElementById('input_mouth').value = '';
        document.getElementById('input_year').value = '';
        document.getElementById('input_value').value = '';
        tableList.get();
    }

    tableList.get = function() {

        let data = tableList.getFormData();
        // console.log("chamei", data);
        $.ajax({
                beforeSend: function(xhrObj) {
                    xhrObj.setRequestHeader('Content-Type', 'application/json');
                    xhrObj.setRequestHeader('Accept', 'application/json');
                    xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
                },
                method: 'POST',
                url: `${BASE_URL}/table/list/1`,
                data: JSON.stringify(data),
                contentType: 'application/json'
            })
            .done(function(data) {
                console.log(data);

                let rows = "";
                for (let i = 0; i < data.elements.length; i++) {
                    rows += '<tr>';
                    rows += '   <td>';
                    rows += data.elements[i].mouth;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows += data.elements[i].year;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows += data.elements[i].value + '%';
                    rows += '    </td>';
                    rows += '    <td>';
                    // rows += '        <span class="label label-primary">Enabled</span>';
                    rows += '    </td>';
                    rows += '    <td class="text-right">';
                    rows += '        <div class="btn-group">';
                    // rows += `            <a href="/table/edit?id=${data.elements[i].id}" class="btn-white btn btn-xs"><i class="fa fa-search"></i> View</a>`;
                    rows += '            <a href="/table/edit?id=' + data.elements[i].id + '" class="btn-white btn btn-xs"><i class="fa fa-edit"></i> Edit</a>';
                    rows += '            <a data-id="' + data.elements[i].id + '"class="btn-white btn btn-xs btnRemove"><i class="far fa-trash-alt"></i> Delete</a>';
                    rows += '        </div>';
                    rows += '    </td>';
                    rows += '</tr>';
                }

                $('#table_table').html(rows);

                $('.btnRemove').on('click', tableList.remove);
            })
            .fail(function(err) {
                //console.log(err);
                toastr.error('Falha ao listar tabelas!');
                return false;
            });
    }

    tableList.search = function() {

        let data = tableList.getFormData();
        // console.log("chamei", data);
        $.ajax({
                beforeSend: function(xhrObj) {
                    xhrObj.setRequestHeader('Content-Type', 'application/json');
                    xhrObj.setRequestHeader('Accept', 'application/json');
                    xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
                },
                method: 'POST',
                url: `${BASE_URL}/table/list/1`,
                data: JSON.stringify(data),
                contentType: 'application/json'
            })
            .done(function(data) {
                console.log(data);

                let rows = "";
                for (let i = 0; i < data.elements.length; i++) {
                    rows += '<tr>';
                    rows += '   <td>';
                    rows += data.elements[i].mouth;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows += data.elements[i].year;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows += data.elements[i].value;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows += '        <span class="label label-primary">Enabled</span>';
                    rows += '    </td>';
                    rows += '    <td class="text-right">';
                    rows += '        <div class="btn-group">';
                    rows += `            <a href="/table/edit?id=${data.elements[i].id}" class="btn-white btn btn-xs"><i class="fa fa-search"></i> View</a>`;
                    rows += '            <a href="/table/edit?id=' + data.elements[i].id + '" class="btn-white btn btn-xs"><i class="fa fa-edit"></i> Edit</a>';
                    rows += '            <a data-id="' + data.elements[i].id + '"class="btn-white btn btn-xs btnRemove"><i class="far fa-trash-alt"></i> Delete</a>';
                    rows += '        </div>';
                    rows += '    </td>';
                    rows += '</tr>';
                }

                $('#table_table').html(rows);

                $('.btnRemove').on('click', tableList.remove);
            })
            .fail(function(err) {
                //console.log(err);
                toastr.error('Falha ao listar tabela!');
                return false;
            });
    }

    tableList.remove = function() {
        var id = $(this).attr('data-id');
        console.log(id)
        $.ajax({
            beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader('Content-Type', 'application/json');
                xhrObj.setRequestHeader('Accept', 'application/json');
                xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
            },
            method: 'DELETE',
            url: `${BASE_URL}/table/delete/${id}`,
            // data: JSON.stringify({ id }),
            contentType: 'application/json'
        }).done(function(data) {
            toastr.success('Tabela deletada!')
            tableList.search()
        }).fail(function(err) {
            toastr.error('Falha ao deletar Tabela!');
            return false;
        });
    }
    return tableList;
})();

tableList.init();
tableList.initEvents();