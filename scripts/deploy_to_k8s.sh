#!/bin/bash
set -eu

./scripts/render.sh
kubectl apply -f ./rendered/