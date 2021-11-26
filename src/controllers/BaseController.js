module.exports = {

    apiCheckToken(token) {
        var request = require('request');
        var options = {
            url: process.env.URLAPI + "checktoken",
            headers: {
                'User-Agent': 'request',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': token
            }
        };
        return new Promise(resolve => {
            request.get(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var result = JSON.parse(body);
                    resolve(result)
                }
                else {
                    resolve(null);
                }
            });
        });
    },

    controlProfile(profileId, page) {

        return new Promise(resolve => {

            //Full Access - Adm
            if (profileId == 1) {
                resolve(true);
            }

            //Free Access Pages
            var controlPage = [];
            controlPage.push({ page: "dashboard" })
            controlPage.push({ page: "aircraft" })
            controlPage.push({ page: "airdrome" })

            var resultPage = controlPage.filter(res => {
                return (res.page == page)
            });

            if (resultPage.length > 0) {
                return resolve(true);
            }

            //Pages Profile Access
            var controlList = [];

            //[Gestor] Restrict Access
            controlList.push({ profileId: 2, page: "userList" })
            controlList.push({ profileId: 2, page: "userRegister" })
            controlList.push({ profileId: 2, page: "logsFiles" })
            controlList.push({ profileId: 2, page: "logsImports" })
            controlList.push({ profileId: 2, page: "customerUpload" })
            controlList.push({ profileId: 2, page: "customerTarget" })
            controlList.push({ profileId: 2, page: "customerRegister" })

            var resultControl = controlList.filter(res => {
                return (res.profileId == profileId && res.page.toLowerCase() == page.toLowerCase())
            });

            if (resultControl.length > 0) {
                //Found, restrict access
                return resolve(false);
            }
            else {
                //Not Found, free access
                return resolve(true);
            }
        });
    },

    renderPage(req, res, page) {
        
        //Return URL
        let pageReturnUrl = req.originalUrl;
        
        //Get Token
        let token = req.cookies["token"];

        //Check if token is valid
        this.apiCheckToken(token).then(result => {

            //Invalid token, redirect to Login Page
            if (!result) {
                //return res.render('pages/index');
                return res.redirect('/?page=' + pageReturnUrl);
            }
            if (!result.ok) {
                //return res.render('pages/index');
                return res.redirect('/?page=' + pageReturnUrl);
            }

            //Check control profile
            this.controlProfile(result.user.profileId, page).then(access => {

                //Not access
                if (!access) {
                    res.clearCookie("token");
                    return res.redirect('/');
                }

                //Access OK
                let pagePath = 'pages/' + page;
                let user = result.user;

                return res.render(pagePath, { user });

            }).catch(err => {
                console.log(err);
                //Error Control, redirect to Login Page
                return res.render('pages/index');
            });
        }).catch(err => {
            //Error API, redirect to Login Page
            res.render('pages/login');
        });
    },

    apiAuthenticate(login, password) {
        var request = require('request');
        var data = { login: login, password: password }
        var options = {
            url: process.env.URLAPI + "authenticate",
            form: data,
            headers: {
                'User-Agent': 'request',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        return new Promise(resolve => {
            request.post(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var result = JSON.parse(body);
                    resolve(result)
                }
                else {
                    resolve(null);
                }
            });
        });
    },
}