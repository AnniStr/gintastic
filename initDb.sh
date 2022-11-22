#!/bin/bash

echo "Creating DB..."
mysql -h localhost -u root --password=7YkECdk=dhhk < "/Users/maximiliankaiser/Documents/HdM/Master/CS3-3/Web Application Architecture (143111)/gintastic/INIT_GINTASTIC_DB.sql"
sleep 1
echo "Populating DB..."
sleep 1
mysql -h localhost -u root --password=7YkECdk=dhhk < "/Users/maximiliankaiser/Documents/HdM/Master/CS3-3/Web Application Architecture (143111)/gintastic/INSERT_GIN_DATA.sql"
echo "DB initialized."