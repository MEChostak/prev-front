var calcEdit = (function() {
    'use strict';
    //var initialPage = 1;
    //var recordsPerPage = 10;

    var calcEdit = {};


    const BASE_URL = "http://localhost:3600";

    var calcEdit = {};

    calcEdit.init = function() {
        //global.listProject($('#ddlProject'));
        $('.dropify').dropify();
        $('.dropify-message > p').html('Insira aqui a sua planilha (arrastando para o box ou clicando)<br/><br/> ATENCÃO! Use o Modelo');

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
        $('.btnNext').on('click', calcEdit.closeModal)
        $('.btnDelete').on('click', calcEdit.delete)
        $('.btnEdit').on('click', calcEdit.edit)
        $('.btnProx').on('click', calcEdit.proximo)
        $('.btnProxWage').on('click', calcEdit.proximowage)
        $('.btnProxResu').on('click', calcEdit.proximoresu)
        $('.btnBackTrans').on('click', calcEdit.voltartrans)
        $('.btnBackContri').on('click', calcEdit.voltarcontri)





        calcEdit.setMask();

        $('.dropify').dropify();
        $('.dropify-message > p').html('Insira aqui a sua planilha (arrastando para o box ou clicando)<br/><br/> ATENCÃO! Use o Modelo');

    };
    calcEdit.proximo = function() {
        $('#wage-tab').tab('show');


    }
    calcEdit.proximowage = function() {
        $('#transition-tab').tab('show');

    }
    calcEdit.proximoresu = function() {
        $('#calcResume-tab').tab('show');

    }
    calcEdit.voltartrans = function() {
        $('#transition-tab').tab('show');


    }
    calcEdit.voltarcontri = function() {
        $('#contribution-tab').tab('show');


    }
    calcEdit.setMask = function() {

    }

    calcEdit.delete = function(data) {
        console.log(data)
        var element = document.getElementById('')
        element.parentNode.removeChild(element)

    }
    calcEdit.edit = function() {
        console.log('edit')

        function edit_row(no) {
            document.getElementById("edit_button" + no).style.display = "none";
            document.getElementById("save_button" + no).style.display = "block";

            var name = document.getElementById("nome_row" + no);
            var cpf = document.getElementById("cpf_row" + no);
            var rg = document.getElementById("rg_row" + no);

            var name_data = name.innerHTML;
            var cpf_data = cpf.innerHTML;
            var rg_data = rg.innerHTML;

            name.innerHTML = "<input type='text' id='name_text" + no + "' value='" + name_data + "'>";
            cpf.innerHTML = "<input type='text' id='cpf_text" + no + "' value='" + cpf_data + "'>";
            rg.innerHTML = "<input type='text' id='rg_text" + no + "' value='" + rg_data + "'>";
        }

        function save_row(no) {
            var name_val = document.getElementById("name_text" + no).value;
            var cpf_val = document.getElementById("cpf_text" + no).value;
            var rg_val = document.getElementById("rg_text" + no).value;

            document.getElementById("nome_row" + no).innerHTML = name_val;
            document.getElementById("cpf_row" + no).innerHTML = cpf_val;
            document.getElementById("rg_row" + no).innerHTML = rg_val;

            document.getElementById("edit_button" + no).style.display = "block";
            document.getElementById("save_button" + no).style.display = "none";
        }

        function delete_row(no) {
            document.getElementById("row" + no + "").outerHTML = "";
        }

        function add_row() {
            var new_name = document.getElementById("new_name").value;
            var new_cpf = document.getElementById("new_cpf").value;
            var new_rg = document.getElementById("new_rg").value;

            var table = document.getElementById("data_table");
            var table_len = (table.rows.length) - 1;
            var row = table.insertRow(table_len).outerHTML = "<tr id='row" + table_len + "'><td id='nome_row" +
                table_len + "'>" + new_name + "</td><td id='cpf_row" + table_len + "'>" + new_cpf +
                "</td><td id='rg_row" + table_len + "'>" + new_rg + "</td><td><input type='button' id='edit_button" +
                table_len + "' value='Edit' class='edit' onclick='edit_row(" + table_len +
                ")'> <input type='button' id='save_button" + table_len +
                "' value='Salvar' class='save' onclick='save_row(" + table_len +
                ")'> <input type='button' value='Deletar' class='delete' onclick='delete_row(" + table_len +
                ")'></td></tr>";

            document.getElementById("new_name").value = "";
            document.getElementById("new_cpf").value = "";
            document.getElementById("new_rg").value = "";
        }

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
        location.href = '/calc';
    }

    calcEdit.closeModal = function(event) {
        event.preventDefault();
        $('#navaids-tab').tab('show');
        $('#myModal').modal('hide');
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

    calcEdit.register = function(event) {
        event.preventDefault();

        if (!$('#pdf')[0].files[0]) {
            toastr.error('Selecione um arquivo para upload!')
            return
        }

        if (!$('#pdf')[0].files[0].name.includes('.pdf')) {
            toastr.error('O arquivo deve ser PDF.')
            return
        }

        var docName = $('#pdf')[0].files[0].name

        var formData = new FormData();
        formData.append('doc', $('#pdf')[0].files[0], `${docName}`);

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
                (
                    $('#myModal').modal('show')
                )
            })
            .fail(function(err) {
                console.log(err);
                toastr.error('Falha ao enviar arquivo!');
                return false;
            });
    }

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