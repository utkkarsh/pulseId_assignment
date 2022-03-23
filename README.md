# pulseId_assignment

# Routes and Journeys -

Similar as given in assignment document

# How to run coverage and testing ->

### `npm test` for testing

### `npm run testCoverage` for coverage report

# Coverage Report

```
PASS  tests/index.test.js (5.179 s)
  Connectivity Test
    √ POST /ruleset (214 ms)
    √ POST /transaction (43 ms)
    √ POST /transaction - duplicate (26 ms)
    √ GET /ruleset (24 ms)
    √ GET /transaction (17 ms)
    √ GET /cashback (27 ms)
    √ GET /abc - invalid Route (8 ms)
    √ POST /transaction - invalid body (22 ms)

  Test Case 1
    √ POST /ruleset 1 (29 ms)
    √ POST /ruleset 2 (34 ms)
    √ POST /transaction 1 (22 ms)
    √ POST /transaction 2 (29 ms)
    √ POST /transaction 3 (27 ms)
    √ GET /cashback (26 ms)
    √ POST /ruleset 3 (bud) (23 ms)
    √ POST /transaction 4 (34 ms)
    √ POST /transaction 5 (23 ms)
    √ POST /transaction 6 (25 ms)
    √ GET /cashback (45 ms)
```

--------------------------------|---------|----------|---------|---------|-------------------
File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------------------|---------|----------|---------|---------|-------------------
All files | 94.26 | 79.41 | 100 | 96.63 |
pulseId_assignment | 100 | 100 | 100 | 100 |
index.js | 100 | 100 | 100 | 100 |
pulseId_assignment/Controllers | 90.54 | 78.12 | 100 | 94.36 |
Cashback.controller.js | 90.9 | 78.57 | 100 | 96.77 | 93
Ruleset.controller.js | 85 | 50 | 100 | 89.47 | 15,72
Transaction.controller.js | 95.23 | 100 | 100 | 95.23 | 14
pulseId_assignment/Models | 100 | 100 | 100 | 100 |
Ruleset.model.js | 100 | 100 | 100 | 100 |
Transaction.model.js | 100 | 100 | 100 | 100 |
pulseId_assignment/Routes | 100 | 100 | 100 | 100 |
Cashback.route.js | 100 | 100 | 100 | 100 |
RuleSet.route.js | 100 | 100 | 100 | 100 |
Transaction.route.js | 100 | 100 | 100 | 100 |
--------------------------------|---------|----------|---------|---------|-------------------

```
Test Suites: 1 passed, 1 total
Tests:       19 passed, 19 total
Snapshots:   0 total
Time:        5.653 s
Ran all test suites.
```
