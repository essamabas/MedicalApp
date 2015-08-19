'use strict';
/**
 * @ngdoc function
 * @name sbAdminAppAuth.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the sbAdminAppAuth
 */
angular.module('sbAdminApp',['ipCookie','ng-token-auth'])

  .config(function($authProvider) {

    // the following shows the default values. values passed to this method
    // will extend the defaults using angular.extend
    $authProvider.configure({
      apiUrl:                  '/api',
      tokenValidationPath:     '/auth/validate_token',
      signOutUrl:              '/auth/sign_out',
      emailRegistrationPath:   '/auth/register',
      accountUpdatePath:       '/auth',
      accountDeletePath:       '/auth',
      confirmationSuccessUrl:  window.location.href,
      passwordResetPath:       '/auth/password',
      passwordUpdatePath:      '/auth/password',
      passwordResetSuccessUrl: window.location.href,
      emailSignInPath:         '/auth/sign_in',
      storage:                 'cookies',
      proxyIf:                 function() { return false; },
      proxyUrl:                '/proxy',
      authProviderPaths: {
        github:   '/auth/github',
        facebook: '/auth/facebook',
        google:   '/auth/google'
      },
      tokenFormat: {
        "access-token": "{{ token }}",
        "token-type":   "Bearer",
        "client":       "{{ clientId }}",
        "expiry":       "{{ expiry }}",
        "uid":          "{{ uid }}"
      },
      parseExpiry: function(headers) {
        // convert from UTC ruby (seconds) to UTC js (milliseconds)
        return (parseInt(headers['expiry']) * 1000) || null;
      },
      handleLoginResponse: function(response) {
        return response.data;
      },
      handleAccountResponse: function(response) {
        return response.data;
      },
      handleTokenValidationResponse: function(response) {
        return response.data;
      }
    })
  })
  .controller('AuthCtrl', function($scope, $auth, $state) {
    
    $scope.handlePrvBtnClick = function(provider) {    
      $auth.authenticate(provider)
        .then(function(resp) {
          // handle success
        })
        .catch(function(resp) {
          // handle errors
        });
    };
    
    // Register Form (Email, Password, RepeatedPassword)
    $scope.handleRegBtnClick = function(registrationForm) {
      $auth.submitRegistration(registrationForm)
        .then(function(resp) {
          // handle success response
        })
        .catch(function(resp) {
          // handle error response
        });
    };
    
    // Login Form (Email, Password)    
    $scope.handleLoginBtnClick = function(loginForm) {
      $auth.submitLogin(loginForm)
        .then(function(resp) {
          // handle success response
          console.log("Response of submitLogin: "+ JSON.stringify(resp));
          $state.go('dashboard.home');
        })
        .catch(function(resp) {
          // handle error response
          console.log("Response of submitLogin: "+  JSON.stringify(resp));
        });
    };
    
    $scope.handleSignOutBtnClick = function() {
      $auth.signOut()
        .then(function(resp) {
          // handle success response
        })
        .catch(function(resp) {
          // handle error response
        });
    };    
          
  });