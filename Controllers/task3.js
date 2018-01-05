var userLoginApp  = angular.module('task3',[]);
// var registeredUsers = new Map();
// var registeredUsers =  


userLoginApp.controller('userLoginController', function($scope){
    $scope.registeredUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};
    $scope.hideError = true;
    $scope.isLoggedIn = false;
    $scope.viewUserDetails = false;
    $scope.errorMessage = '';
    // debugger;
    if($scope.registeredUsers){
        $scope.userCreated = false;
    }else{
        $scope.userCreated = true;
    }

    $scope.loginSuccess = function(){
        $scope.isLoggedIn = true;
        $scope.loginName = sessionStorage.loginName;
    }

    $scope.logout = function(){
        $scope.isLoggedIn = '';
        sessionStorage.loginName = $scope.loginName = '';
    }


    if(sessionStorage.loginName){
        $scope.loginSuccess();
    }else{
        $scope.logout();
    }
    
    $scope.hideLogin = false;
    
    $scope.register = function(isRegister){
        if(isRegister){
            $scope.hideLogin = true;
        }else{
            $scope.hideLogin = false;
        }
    }

    $scope.submitRegister = function(){
        // var user = new Map();
        // debugger;
        $scope.hideError = true;
        $scope.errorMessage = '';
        let obj = {};
        let email = $scope.registerEmailAddress
        if($scope.registeredUsers[email]){
            $scope.hideError = false;
            $scope.errorMessage = 'Email Already Exists. Please try agian with another email address.';
        }else{
            obj['FullName'] = $scope.registerFullName;
            obj['Email'] = $scope.registerEmailAddress;
            obj['Password'] = $scope.registerPassword;
            $scope.registeredUsers[$scope.registerEmailAddress] =  obj;
            localStorage.setItem('users', JSON.stringify($scope.registeredUsers));
            $scope.resetRegister();
            $scope.hideLogin = false;
        }
        
    }

    $scope.submitLogin = function(){
        if($scope.registeredUsers[$scope.loginEmailAddress] && $scope.registeredUsers[$scope.loginEmailAddress]['Password'] == $scope.loginPassword){      
            sessionStorage.loginName = $scope.registeredUsers[$scope.loginEmailAddress]['FullName'];
            sessionStorage.loginEmail = $scope.registeredUsers[$scope.loginEmailAddress]['Email'];
            $scope.loginSuccess();
        }else{
            $scope.hideError = false;
            $scope.errorMessage = 'Invalid password. Please try again.';
        }
    }

    $scope.resetLogin = function(){
        $scope.loginEmailAddress = '';
        $scope.loginPassword = '';
    }

    $scope.resetRegister = function(){
        $scope.registerFullName = '';
        $scope.registerEmailAddress = '';
        $scope.registerPassword = '';
    }

    $scope.viewDetails = function(){
        $scope.viewUserDetails = true;
        var curUser = $scope.registeredUsers[sessionStorage.loginEmail];
        $scope.viewFullName =  $scope.loginName = curUser['FullName'];
        // $scope.viewEmailAddress = curUser['Email'];
        // $scope.viewPassword = curUser['Password']; 
    }

    $scope.updateUser = function(){
        var obj = $scope.registeredUsers[sessionStorage.loginEmail];
        obj['FullName'] = $scope.viewFullName;
        $scope.registeredUsers[sessionStorage.loginEmail] = obj;
        localStorage.setItem('users', JSON.stringify($scope.registeredUsers));
        $scope.viewDetails();
    }
    
})