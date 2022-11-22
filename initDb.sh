#!/bin/bash

echo "Creating DB..."
mysql -h localhost -u root --password=7YkECdk=dhhk < "INIT_GINTASTIC_DB.sql"
sleep 1
echo "Populating DB..."
sleep 1
mysql -h localhost -u root --password=7YkECdk=dhhk < "INSERT_GIN_DATA.sql"
echo "DB initialized."