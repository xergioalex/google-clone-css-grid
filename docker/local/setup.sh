#!/bin/bash

# Utils functions
. ./../utils.sh

# Create envs vars if don't exist
utils.load_environment

if [[ "$1" == "base" ]]; then
  utils.printer "Tip: Run this command only the first time outside the container"
  ENV_FILES=(".env" "../../.env" "app/.env")
  utils.check_envs_files "${ENV_FILES[@]}"
  utils.load_vscode_configs
  utils.load_environment_permissions
  utils.check_local_network
  utils.printer "Setup done..."
fi
