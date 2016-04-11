#!/bin/sh

FILE=(`ls static/music | wc -l`)

for ((c=0;c<$FILE;c++))
do
	node indexw.js $c
done