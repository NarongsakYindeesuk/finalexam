#!/bin/bash
echo "Normal request:"
curl -s -I http://localhost:8080/ | sed -n '1,5p'
echo "\nSQLi attempt (should be blocked):"
curl -s -I "http://localhost:8080/?search=1' OR '1'='1" | sed -n '1,10p'
