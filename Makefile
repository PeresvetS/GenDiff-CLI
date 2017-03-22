install: 
	npm install

run:
	npm run babel-node -- src/bin/gendiff.js ${file1} ${file2}

build:
		rm -rf dist
		npm run build

publish:
	npm publish

lint:
	npm run eslint -- src/ test

test:
		npm test

.PHONY: test
