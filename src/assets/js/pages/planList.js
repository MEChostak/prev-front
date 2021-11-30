var planList = (function () {
    'use strict';
    //var initialPage = 1;
    //var recordsPerPage = 10;

    const BASE_URL = "http://localhost:3600";

    var planList = {};

    planList.init = function () {
        //global.listProject($('#ddlProject'));

        planList.auth();
        planList.validateForm();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
       
        planList.search();
    };

    planList.initEvents = function () {
        $('.btnSave').on('click', planList.save);
        $('.btnClear').on('click', planList.clear);

        planList.setMask();
    };

    planList.setMask = function () {
      
    }

    planList.validateForm = function () {
        
    };

    planList.getFormData = function () {
        let data = {
            name: $('#name').val(),
            description: $('#description').val(),
            price: $('#price').val(),
            timeCourse: $('#timeCourse').val(),
        }

        return data;
    }

    planList.auth = function () {
        var token = localStorage.getItem('token')

        token == null ? location.href = '/' : null
    }

    planList.logout = function () {
        localStorage.clear()
        location.href = '/'
    }

    planList.cancel = function () {

        location.href = '/plan';
    }


    planList.search = function () {
        
        let data = planList.getFormData();
        //console.log(data);
        $.ajax({
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader('Content-Type', 'application/json');
                xhrObj.setRequestHeader('Accept', 'application/json');
                xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
            },
            method: 'POST',
            url: `${BASE_URL}/plan/list/1`,
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
                    rows +=         data.elements[i].description;
                    rows += '    </td>';
                    rows += '    <td>';
                    rows +=         data.elements[i].price;
                    rows += '    </td>';
                    /* rows += '    <td>';
                    rows +=         data.elements[i].organization.name;
                    rows += '    </td>'; */
                    rows += '    <td>';
                    rows += '        <span class="label label-primary">Enabled</span>';
                    rows += '    </td>';
                    rows += '    <td class="text-right">';
                    rows += '        <div class="btn-group">';
                    rows += `            <a href="/plan/edit?id=${data.elements[i].id}" class="btn-white btn btn-xs"><i class="fa fa-search"></i> View</a>`;
                    rows += '            <a href="/plan/edit?id='+data.elements[i].id+'" class="btn-white btn btn-xs"><i class="fa fa-edit"></i> Edit</a>';
                    rows += '            <a data-id="' + data.elements[i].id + '"class="btn-white btn btn-xs btnRemove"><i class="far fa-trash-alt"></i> Delete</a>';
                    rows += '        </div>';
                    rows += '    </td>';
                    rows += '</tr>';
                }

                $('#table_plan').html(rows);

                $('.btnRemove').on('click', planList.remove);
            })
            .fail(function (err) {
                //console.log(err);
                toastr.error('Falha ao listar planos!');
                return false;
            });
    };

    planList.remove = function () {
        var id = $(this).attr('data-id');

        $.ajax({
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader('Content-Type', 'application/json');
                xhrObj.setRequestHeader('Accept', 'application/json');
                xhrObj.setRequestHeader('x-access-token', localStorage.getItem('token'));
            },
            method: 'DELETE',
            url: `${BASE_URL}/plan/delete/${id}`,
            // data: JSON.stringify({id}),
            contentType: 'application/json'
        })
        .done(function (data) {
            toastr.success('Plano excluído!') 
            planList.search()
        })
        .fail(function (err) {
            toastr.error('Falha ao deletar plano!');
            return false;
        });
    }

    return planList;
})();

planList.init();
planList.initEvents();