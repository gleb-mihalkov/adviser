#!/bin/bash

gulp build --compress
git add .
git commit -m $1
git push
cd ./dist/
git add .
git commit -m $1
git push