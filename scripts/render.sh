#!/bin/bash
mkdir -p ./rendered/

for f in ./deployment/*.yml
do
  envsubst < $f > "./rendered/$(basename $f)"
done