cd ../../
touch .env
echo -e "DB_FILE=./src/db/database.json" >> .env

touch .env.test
echo -e "DB_FILE=./__TESTS__/database-test.json" >> .env.test
