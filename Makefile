install: 
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js ${file1} ${file2}

publish:
	npm publish

lint:
	npm run eslint -- src/

test:
		npm test
