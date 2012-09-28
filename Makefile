
SRC = lib/apic.js node_modules/superagent/superagent.js

TESTS = test/**/*.js
REPORTER = dot

all: apic.js apic.min.js

test: apic-ti-test
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--timeout 200 \
		--growl \
		$(TESTS)

test-cov: lib-cov
	APIC_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	jscoverage lib lib-cov

apic-ti-test:
	cat test/fixtures/patch.js $(SRC) > test/fixtures/apic_ti_test.js

apic.js: $(SRC)
	cat $^ > $@

apic.min.js: apic.js
	uglifyjs --no-mangle $< > $@

clean:
	rm -f apic{,.min}.js

.PHONY: test-cov test ti-test clean