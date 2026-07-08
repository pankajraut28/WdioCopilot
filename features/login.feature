Feature: Login
  As a user
  I want to login to the application
  So that I can access the dashboard

  Scenario: Successful Login
    Given user launches the application
    When user logs in with valid credentials
    Then dashboard should be displayed

  Scenario Outline: Invalid Login
    Given user launches the application
    When user logs in using "<username>" and "<password>"
    Then "<errorMessage>" should be displayed

    Examples:
      | username      | password       | errorMessage                |
      | invalid_user  | Password123    | Your username is invalid!   |
      | student       | WrongPassword  | Your password is invalid!   |
      |               | Password123    | Your username is invalid!   |
      | student       |                | Your password is invalid!   |