publish:
		npm publish --dry-run

lint:
		npx eslint .

install: install-deps

install-deps:
	npm ci