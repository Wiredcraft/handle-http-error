DEBUG = DEBUG=handle-http-error:*
BIN = ./node_modules/.bin
TESTS = test/*.test.js
MOCHA_OPTS = -b --timeout 5000 --reporter spec

lint:
	@echo "Linting..."
	@$(BIN)/jscs index.js lib test
test: lint
	@echo "Testing..."
	@NODE_ENV=test $(DEBUG) $(BIN)/_mocha $(MOCHA_OPTS) $(TESTS)
test-cov: lint
	@echo "Testing..."
	@NODE_ENV=test $(DEBUG) $(BIN)/istanbul cover $(BIN)/_mocha -- $(MOCHA_OPTS) $(TESTS)
test-coveralls: test-cov
	@cat ./coverage/lcov.info | $(BIN)/coveralls --verbose
.PHONY: lint test test-cov test-coveralls
