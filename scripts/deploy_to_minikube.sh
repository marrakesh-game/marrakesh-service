#!/bin/bash
set -eu

./scripts/deploy_to_k8s.sh \
&& kubectl delete pod --all -n marrakesh
