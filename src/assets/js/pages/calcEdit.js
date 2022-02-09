// const { getFilenameFromUrl } = require("pdfjs-dist");

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






        calcEdit.setMask();



    };

    calcEdit.setMask = function() {

    }

    calcEdit.delete = function(data) {
        console.log('testadndoooo')
            // let tr = document.querySelectorAll('tr');
            // tr.forEach((e) => {
            //     console.log('O ID é: ' + e.id);

        //     let idd = e.id
        //     if (idd) {
        //         idd.remove();
        //     }


        // })
    }
    calcEdit.edit = function() {



        $('#cancelar').on('click', function() {
            $('#num').val('');
            // $('#DataInicial').val('');
            // $('#DataFinal').val('');
            // $('#Tipo').val('');
            // $('#Fator').val('');
            // $('#Empresa').val('');
            // $('#Cargo').val('');


        });
        $('#registrar').on('click', function() {

            var num = form1.num.value;
            // var emailVal = form1.email.value;
            // var ddnVal = form1.DN.value;
            // var cepVal = form1.CEP.value;

            var testCad = 0;

            console.log(num);

            if (num != "" && ddnVal != "" && emailVal != "" && cepVal != "")

                if (num != "") {



                    var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

                    if (filtro.test(num)) {


                        $('#tabCrud').append('<tr"><td>' + num + '</td> <td>' + emailVal + '</td><td>' + ddnVal + '</td><td>' + cepVal + '</td> <td><input type="button" class="AltBut" value="Alterar"/></td> <td><input type="button" class="salBut" value="Salvar"/></td><td><input type="button" class="ExBut" value="Excluir"/></td></tr>');
                        $('#tabCrud').append('<tr"><td>' + num + '</td> <td><input type="button" class="AltBut" value="Alterar"/></td> <td><input type="button" class="salBut" value="Salvar"/></td><td><input type="button" class="ExBut" value="Excluir"/></td></tr>');

                        $('#num').val('');
                        // $('#DN').val('');
                        // $('#email').val('');
                        // $('#CEP').val('');

                        //$('.salBut').hide();


                        $(".AltBut").bind("click", Editar);
                        $(".salBut").bind("click", FunSal);
                        $(".ExBut").bind("click", Excluir);


                        return true;


                    } else {
                        alert("Não é válido!");

                        return false;
                    }



                } else {

                    alert("Todos os campos são obrigatorios");
                }







            function Editar() {

                var par = $(this).parent().parent(); //tr
                var num = par.children("td:nth-child(1)");
                // var tdEmail = par.children("td:nth-child(2)");
                // var tdDN = par.children("td:nth-child(3)");
                // var tdCEP = par.children("td:nth-child(4)");




                num.html("<input type ='text' value='" + num.html() + "'/td>");
                // tdEmail.html("<input type='text' id='txtEmail' value='" + tdEmail.html() + "'/>");
                // tdDN.html("<input type='text'id='txtDN' value='" + tdDN.html() + "'/>");
                // tdCEP.html("<input type='text'id='txtDN' value='" + tdCEP.html() + "'/>");


                //$('.salBut').show()

            }


            function FunSal() {
                var par = $(this).parent().parent(); //tr
                var num = par.children("td:nth-child(1)");
                // var tdDN = par.children("td:nth-child(2)");
                // var tdEmail = par.children("td:nth-child(3)");
                // var tdCEP = par.children("td:nth-child(4)");

                num.html(num.children("input[type=text]").val());
                // tdDN.html(tdDN.children("input[type=text]").val());
                // tdEmail.html(tdEmail.children("input[type=text]").val());
                // tdCEP.html(tdCEP.children("input[type=text]").val());
                //$('.AltBut').show();
                //$('.salBut').hide();


            };


            function Excluir() {
                var par = $(this).parent().parent();
                //$('.AltBut').show() //tr
                par.remove();
            };
        });
    }
    calcEdit.calc = function() {



        // B21 Pensão por morte previdenciária
        // B25 Auxílio-reclusão
        // B31 Auxílio-doença previdenciário(temporario)
        const doenca = function() {
            var timeContri = 0
            var carencia = 0
            var incapacidade = 0
            var coeficiente = '91%'


        }



        // B32 Aposentadoria por invalidez previdenciária
        const incapacidade = function() {
            // requisitos
            let contri = 365
            let incapacidade = "incapacidade permanente para o trabalho comprovado com pericia oficial"
            let segurado = "qualidade de segurado"
                // calculo 
            let salario = "60% da media de todas as contribuiçoes a partir de 07/94 + 2% por ano que ultrapassar os 20 anos. 100% da media quando decrorrer de acidentes de trabalho, doença profissional ou doença do trabalho."


        }

        // B36 Auxílio acidente
        const acidente = function() {
            let salario = '50% beneficio'

        }

        // B41 Aposentadoria por idade
        const idade = function() {
            // requisitos apos a reforma
            let idadeMan = 65
            let idadeWoman = 62
            let carenciaWoman = 5475
            let carenciaMan = 7300
            let rmi = "60% da media de todos os seus salarios + 2% a cada ano que ultrapassar 20 anos para os homens e 15 anos para as mulheres "

            // requisitos antes da reforma 
            let idadeManBefore = 65
            let idadeWomanBefore = 60
            let carenciaWomanBefore = 5475
            let carenciaManBefore = 5475
            let rmiBefore = "70% da media dos seus maiores salarios +1% a cada ano completo de trabalho"
                // a regra so e valida se vc completou os requisitos ate o dia 12/11/2019

            //caso nao tenha completado os requisitos mas ja tenha começado a trabalhar antes da reforma, foi criada uma regra de transição  
            let idadeManMiddle = 65
            let idadeWomanMiddle = 61.5
            let carenciaWomanMiddle = 5475
            let carenciaManMiddle = 5475
            let rmiMiddle = "60% da media de todos os seus salarios + 2% a cada ano que ultrapassar 20 anos para os homens e 15 anos para as mulheres "

            // calculo antes da reforma 
            const timeContri = dataFinal - dataInicial + 1
            let timeContri80 = timeContri / 100 * 80
            const salario = salario
            let maioresSalarios = "80% dos maiores",
                salario
            let salarioBeneficio = timeContri80 / 240
            let sobrevida = 76.8
            let aliquota1 = salario / 100 * 8 //ate 1693,72
            let aliquota2 = salario / 100 * 9 // de 1693,72 ate 2822,90
            let aliquota3 = salario / 100 * 11 // de 2822,90 até 5645,80
            let fatorPrevidenciario = timeContri * aliquota / sobrevida * [1 + (idadeContri + timeContri * aliquota) / 100]


            let rmi = salarioBeneficio / 100 * 70


        }

        // B42 Aposentadoria por tempo de contribuição
        const time = function() {
            let timeContriMan = 12775
            let timeContriWoman = 10950
            let idade = 0
            let rmi = "80% das maiores contribuiçoes a partir de julho de 94 devidamente atualizadas pelo ipca ou ipca-E, 20% das contribuiçoes podem ser descartadas automaticamente e sobre esse valor se aplica o fator previdenciario"

            let fatorPrevidenciario = timeContri * aliquota / sobrevida * [1 + (idade + timeContri * aliquota) / 100]

            // APOSENTADORIA POR TEMPO DE CONTRIBUICAO SEM FATOR PREVIDENCIARIO ATÉ 12/11/2019: 

            let pointsMan = timeContriMan == 12775 && idade == 61
            let pointsWoman = timeContriWoman == 10950 && idade == 55
                // fatorprevidenciario = 0


        }

        // B46 Aposentadoria por tempo de contribuição especial
        const especialContri = function() {
            let timeLowContri = 9125
            let timeMiddleContri = 7300
            let timeHightContri = 5475
            let rmi = "100% da media dos 80% maiores salarios a partir de julho de 94"

        }

        // B57 Aposentadoria por tempo de contribuição do professor
        const professor = function() {
                let timeContriMan = 10950
                let timeContriWoman = 9125
                let idade = 0
                let rmi = "80% maiores salarios"
                    // Cálculo do professor será igual a aposentadoria por tempo de contribuição normal com redutor de 5 anos no tempo e na idade;

            }
            // B92 Aposentadoria por invalidez por acidente do trabalho
        const incapacidadeAcidente = function() {
            // forma de calculo
            let salario = "100% da media aritmetica de 80% dos maiores salario"
        }

        // B93 Pensão por morte acidentária
        // B91 Auxílio-doença por acidente do trabalho comum
        const doencaComum = function() {
            var timeContri = 0
            var carencia = 0
            var incapacidade = 0
            var salario = 80 % salarios
            var media = salario / numSalario
        }

        // B94 Auxílio-acidente por acidente do trabalho
        const acidenteTrab = function() {
            let salario = '50% beneficio'
        }







        const timeContri = 10950
        let calcContri = dataFinal - dataInicial + 1
        let porc = timeContri / 100
        let porcTime = timeContri / porc

        const carencia = 180
        let carenciaCount = numCarencia
        let porcCarencia = carencia / 100
        let porcCountriCarencia = carencia / porcCarencia


        const point = 88
        let pointCount = numPoint
        let porcPoint = point / 100
        let porcePoint = point / porcPoint
        const y = pdf




        // time contribution bar 
        if (calcContri < timeContri) {
            div.style = "width: porcTime%;"
            div.class = "progress-bar progress-bar-danger"
        }
        if (calcContri >= timeContri) {
            div.style = "width: 100%;"
            div.class = "progress-bar"
        }
        // carencia 
        if (carenciaCount < carencia) {
            div.style = "width: porcContriCarencia%;"
            div.class = "progress-bar progress-bar-danger"
        }
        if (carenciaCount >= carencia) {
            div.style = "width: 100%;"
            div.class = "progress-bar"
        }
        // pontos 
        if (pointCount < point) {
            div.style = "width: porcePoint%;"
            div.class = "progress-bar progress-bar-danger"
        }
        if (pointCount >= point) {
            div.style = "width: 100%;"
            div.class = "progress-bar"
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