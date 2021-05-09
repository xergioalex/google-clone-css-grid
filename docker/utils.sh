#!/bin/bash

# Printer with shell colors
function utils.printer {
  # BASH COLORS
  GREEN='\033[0;32m'
    RESET='\033[0m'
  if [[ ! -z "$2" ]]; then
    echo ""
  fi
  echo -e "${GREEN}$1${RESET}"
}


# Create enviroment files if don't exists
function utils.check_envs_files {
  ENV_FILES=("$@")
  for i in "${ENV_FILES[@]}";  do
    if [[ ! -f "$i" ]]; then
      cp "$i.example" "$i"
    fi
  done
}

function utils.check_local_network {
  echo ${PROJECT_NETWORK}
  if [[ -z $(docker network ls | grep "${PROJECT_NETWORK}") ]]; then
    docker network create ${PROJECT_NETWORK}
  fi
}


# Load environment vars in root directory
function utils.load_environment {
  if [[ ! -z $(cat .env | xargs)  ]]; then
    # export $(grep -vwE "#" .env | xargs)
    set -a
    source .env
    set +a
  fi
}


# Load environment vars in root directory
function utils.load_environment_permissions {
  PERMISSIONS="$(id -u):$(id -g)"
  sed -i.bak "s/.*SERVICE_PERMISSIONS.*/SERVICE_PERMISSIONS=$PERMISSIONS/" .env
  rm  .env.bak
  sed -i.bak "s/.*SERVICE_PERMISSIONS.*/SERVICE_PERMISSIONS=$PERMISSIONS/" app/.env
  rm  app/.env.bak
  sed -i.bak "s/.*SERVICE_PERMISSIONS.*/SERVICE_PERMISSIONS=$PERMISSIONS/" ../../.env
  rm  ../../.env.bak
}


# Load vscode configs in root directory
function utils.load_vscode_configs {
  if [[ ! -d "../../.devcontainer" ]]; then
    cp -R "../../.devcontainer_example" "../../.devcontainer"
  fi
  if [[ ! -d ".vscode" ]]; then
    cp -R "../../.vscode_example" "../../.vscode"
  fi
}
