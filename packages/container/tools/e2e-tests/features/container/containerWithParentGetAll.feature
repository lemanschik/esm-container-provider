Feature: Get all, when container has a parent container

  A container can provide a resolved value for a given service identifier.

  Background: Having a container with a parent container

    Given a "parent" container
    And a "child" container with "parent" parent

    Rule: container provides a value given a service identifier

      Scenario: A binding is bound to a parent container and it is resolved in child container
        Given a service "weapon" sword type binding as "sword"
        When "sword" binding is bound to "parent" container
        And "child" container gets all values for service "weapon"
        Then value is an array with 1 sword

      Scenario: A binding is bound to both parent and child containers and it is resolved in child container
        Given a service "weapon" sword type binding as "sword"
        When "sword" binding is bound to "parent" container
        And "sword" binding is bound to "child" container
        And "child" container gets all values for service "weapon"
        Then value is an array with 1 sword

      Scenario: A binding is bound to both parent and child containers and it is resolved in child container
        Given a service "weapon" sword type binding as "sword"
        When "sword" binding is bound to "parent" container
        And "sword" binding is bound to "child" container
        And "child" container gets all values in chained mode for service "weapon"
        Then value is an array with 2 swords
