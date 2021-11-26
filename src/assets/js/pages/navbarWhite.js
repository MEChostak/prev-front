var navbarWhite = (function () {
    'use strict';
    //var initialPage = 1;
    //var recordsPerPage = 10;

    // const BASE_URL = "http://localhost:3600";

    var navbarWhite = {};

    navbarWhite.init = function () {
        //global.listProject($('#ddlProject'));

        navbarWhite.auth();
        navbarWhite.validateForm();

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
       
         
        const id = urlParams.get('id')
        if (id !== null) navbarWhite.get(id);

    };

    navbarWhite.initEvents = function () {
        $('.btnLogout').on('click', navbarWhite.logout);

        navbarWhite.setMask();
    };

    navbarWhite.auth = function () {
        var token = localStorage.getItem('token')

        token == null ? location.href = '/' : null
    }

    navbarWhite.logout = function () {
        localStorage.clear()

        location.href = '/'
    }

    navbarWhite.setMask = function () {

    }

    navbarWhite.validateForm = function () {
        
    };

    navbarWhite.setFormData = function (data) {
       
    }

    navbarWhite.getFormData = function () {
       
    }

    navbarWhite.cancel = function () {
        
    }
   
    return navbarWhite;
})();

navbarWhite.init();
navbarWhite.initEvents();