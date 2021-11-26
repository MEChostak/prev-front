var userList = (function() {
	'use strict';
	var initialPage = 1;
	var recordsPerPage = 10;

	var establishmentList = {};

	establishmentList.init = function() {
		global.listProject($('#ddlProject'));
		global.listPartnerType($('#ddlPartnerType'));
		global.listProduct($('#ddlProduct'));
		partnerEdit.edit();
	};

	establishmentList.initEvents = function() {
		global.listProduct($('#select-product'));
		statusdb.list($('#select-status'), 'establishment');
		$('.btn-pesquisa').on('click', establishmentList.filter);
        $('.btn-pesquisa').on('click', establishmentList.filter);
	};
	
	establishmentList.filter = function(e, page) {
		let $document = $('.document').val();
		let $companyName = $('.companyName').val();
		let $tradingName = $('.tradingName').val();
		let $statusID = $('#select-status').val();
		let $bankAccount = '';
		let $partnerId = $('#txtParceiro').val();

		if ($statusID === 'Todos') $statusID = '';
		if ($statusID === 'credenciado' || $statusID === 'erro') {
			$statusID = '';
			$bankAccount = $('#select-status').val();
		}
		if (page === undefined || page == null) page = 1;

		establishmentList.list(page, $document, $companyName, $tradingName, $statusID, $partnerId, $bankAccount);
	};

	establishmentList.detail = function() {
		var userId = $(this).attr('data-id');
		location.href = '/establishment/detail?id=' + userId;
	};

	establishmentList.edit = function() {
		var userId = $(this).attr('data-id');
		location.href = '/establishment/edit?id=' + userId;
	};

	establishmentList.remove = function() {
		var userId = $(this).attr('data-id');

		bootbox.confirm('Confirma a remoção do cliente?', function(result) {
			if (result) {
				$.ajax({
					beforeSend: function(xhrObj) {
						xhrObj.setRequestHeader('Content-Type', 'application/json');
						xhrObj.setRequestHeader('Accept', 'application/json');
						xhrObj.setRequestHeader('x-access-token', main.getCookie('token'));
					},
					method: 'POST',
					url: BASE_URL + `establishments/remove`,
					data: JSON.stringify({ id: userId }),
					contentType: 'application/json'
				})
					.done(function(data) {
						establishmentList.filter();
					})
					.fail(function(err) {
						main.errorMessage(err.responseJSON.message);
						main.loadingClose();
						return false;
					});
			}
		});
	};

	establishmentList.changePage = function(page) {
		establishmentList.filter(null, page);
	};

	establishmentList.list = function(
		pageSelected,
		document,
		companyName,
		tradingName,
		statusID,
		partnerId,
		bankAccount
	) {
		main.loading();

		let page = initialPage;
		if (pageSelected != null) page = pageSelected;

		$.ajax({
			beforeSend: function(xhrObj) {
				xhrObj.setRequestHeader('Content-Type', 'application/json');
				xhrObj.setRequestHeader('Accept', 'application/json');
				xhrObj.setRequestHeader('x-access-token', main.getCookie('token'));
			},
			method: 'GET',
			url:
				BASE_URL +
				`establishments/list?page=${page}&recordsPerPage=${recordsPerPage}&cpfCnpj=${document}&qCompanyName=${companyName}&qTradingName=${tradingName}&statusID=${statusID}&partner=${partnerId}&bankAccount=${bankAccount}`,
			contentType: 'application/json'
		})
			.done(function(data) {
				if (!data.ok) {
					main.loadingClose();
					return false;
				}

				var tbody = $('#list tbody');
				tbody.empty();
				$.each(data.list, function(index, item) {
					let stateName = item.StateName == null ? '-' : item.StateName;
					let statusDess = item.statusDescription == null ? '-' : item.statusDescription;
					let filledBy = item.FilledBy == null ? '-' : item.FilledBy;
					let cityName = item.CityName == null ? '-' : item.CityName;
					let tradingName = item.tradingName == null ? '' : item.tradingName;
					let smartbankStatus = item.SmartbankStatus == null ? '' : item.SmartbankStatus;

					let html = '<tr>';
					html += '<td>' + item.cpfCnpj + '</td>';
					html += '<td>' + item.companyName + '</td>';
					html += '<td>' + tradingName + '</td>';
					html += '<td>' + item.PartnerName + '</td>';
					html += '<td>' + filledBy + '</td>';
					html += '<td>' + main.formatarData(item.createdAt) + '</td>';
					html += '<td>' + cityName + '</td>';
					html += '<td>' + stateName + '</td>';
					html += '<td>' + statusDess + '</td>';
					html += '<td>' + smartbankStatus + '</td>';
					html += '<td class="text-center table-actions">';
					if (
						item.statusDescription === 'Aguardando Aprovação' ||
						item.statusDescription === 'Aguardando Envio' ||
						item.statusDescription === 'Erro no credenciamento'
					) {
						html +=
							"<a href='#' data-provide='tooltip' title='Remover' data-original-title='Remover' data-id='" +
							item.id +
							"' class='btnRemover'>";
						html += "<i class='ti-trash'></i>";
						html += '</a>&nbsp;&nbsp;&nbsp;';
					}
					if (item.statusDescription === 'Credenciado') {
						html +=
							"<a href='#' data-provide='tooltip' title='Nova Meta' data-original-title='Nova Meta' data-id='" +
							item.id +
							"' class='btnTarget'>";
						html += "<i class='ti-money'></i>";
						html += '</a>&nbsp;&nbsp;&nbsp;';
					}
					html +=
						"<a href='#' data-provide='tooltip' title='Visualizar' data-original-title='Visualizar' data-id='" +
						item.id +
						"' class='btnDetalhe'>";
					html += "<i class='ti-eye'></i>";
					html += '</a>&nbsp;&nbsp;&nbsp;';
					html +=
						"<a href='#' data-provide='tooltip' title='Editar' data-original-title='Editar' data-id='" +
						item.id +
						"' class='btnEditar'>";
					html += "<i class='ti-pencil'></i>";
					html += '</td></tr>';
					tbody.append(html);
				});

				$('.btnDetalhe').on('click', establishmentList.detail);
				$('.btnDetalhe').tooltip();
				$('.btnEditar').on('click', establishmentList.edit);
				$('.btnEditar').tooltip();
				$('.btnRemover').on('click', establishmentList.remove);
				$('.btnRemover').tooltip();
				$('.btnTarget').on('click', establishmentList.target);
				$('.btnTarget').tooltip();
				//main.pagination($('#pagination'),1,10, );

				$('#pagination').pagination({
					items: data.count[0].total,
					itemsOnPage: recordsPerPage,
					currentPage: page,
					onPageClick: function(page) {
						establishmentList.changePage(page);
					}
				});

				main.loadingClose();
			})
			.fail(function(err) {
				main.errorMessage(err.responseJSON.message);
				main.loadingClose();
				return false;
			});
	};

	return establishmentList;
})();

establishmentList.init();
establishmentList.initEvents();