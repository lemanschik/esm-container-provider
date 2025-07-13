Feature: Get, when container has a parent container

  A container can provide a resolved value for a given service identifier.

  Background: Having a container with a parent container

    Given a "parent" container
    And a "child" container with "parent" parent

    Rule: container provides a value given a service identifier

      Scenario: A binding is bound to a parent container and it is resolved in child container
        Given a service "weapon" sword type binding as "sword"
        When "sword" binding is bound to "parent" container
        And "child" container gets a value for service "weapon"
        Then value is a sword
