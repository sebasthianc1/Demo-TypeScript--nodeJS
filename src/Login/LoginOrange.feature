@Login

Feature: Inicio de Sesión en una Aplicación

  Scenario: Inicio de Sesión Exitoso
    Given I'm a user with tags "login" [framework]
    Given que estoy en la página de inicio de sesión
    When ingreso mi nombre de usuario y mi contraseña
    And hago clic en el botón "Login"
    Then debería ser redirigido a la página principal