//初始化
window.fbAsyncInit = function () {
    FB.init({
        appId: '438786193549966',
        cookie: true,
        xfbml: true,
        version: 'v3.2'
    });
    //記錄用戶行為資料 可在後台查看用戶資訊
    FB.AppEvents.logPageView();
};
//嵌入臉書sdk
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(function () {
    //點擊登入按鈕
    $("#login").click(function () {
        //檢查臉書登入狀態
        FB.getLoginStatus(function (response) {
            //如果已經有授權過應用程式
            if (response.authResponse) {
                //呼叫FB.api()取得使用者資料
                FB.api('/me', { fields: 'id,name,email' }, function (response) {
                    //這邊就可以判斷取得資料跟網站使用者資料是否一致
                });
                //沒授權過應用程式
            } else {
                //呼叫FB.login()請求使用者授權
                FB.login(function (response) {
                    if (response.authResponse) {
                        FB.api('/me', { fields: 'id,name,email' }, function (response) {
                            //這邊就可以判斷取得資料跟網站使用者資料是否一致
                        });
                    }
                    //FB.login()預設只會回傳基本的授權資料
                    //如果想取得額外的授權資料需要另外設定在scope參數裡面
                    //可以設定的授權資料可以參考官方文件          
                }, { scope: 'email,user_likes' });
            }
        });
    });
});

// // This is called with the results from from FB.getLoginStatus().
// function statusChangeCallback(response) {
//     console.log('statusChangeCallback');
//     console.log(response);
//     // The response object is returned with a status field that lets the
//     // app know the current login status of the person.
//     // Full docs on the response object can be found in the documentation
//     // for FB.getLoginStatus().
//     if (response.status === 'connected') {
//         // Logged into your app and Facebook.
//         testAPI();
//     } else if (response.status === 'not_authorized') {
//         // The person is logged into Facebook, but not your app.
//         document.getElementById('status').innerHTML = 'Please log ' +
//             'into this app.';
//     } else {
//         // The person is not logged into Facebook, so we're not sure if
//         // they are logged into this app or not.
//         document.getElementById('status').innerHTML = 'Please log ' +
//             'into Facebook.';
//     }
// }

// // This function is called when someone finishes with the Login
// // Button.  See the onlogin handler attached to it in the sample
// // code below.
// function checkLoginState() {
//     FB.getLoginStatus(function (response) {
//         statusChangeCallback(response);
//     });
// }

// // Here we run a very simple test of the Graph API after login is
// // successful.  See statusChangeCallback() for when this call is made.
// function testAPI() {
//     console.log('Welcome!  Fetching your information.... ');
//     FB.api('/me', function (response) {
//         console.log('Successful login for: ' + response.name);
//         document.getElementById('status').innerHTML =
//             'Thanks for logging in, ' + response.name + '!';
//     });

// }