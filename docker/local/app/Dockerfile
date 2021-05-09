FROM node:14.15.1-buster-slim
LABEL maintainer="xergioalex@gmail.com"

RUN apt-get update -y && \
    apt-get install less git wget unzip curl make -y && \
    sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.1/zsh-in-docker.sh)" -- \
    -t robbyrussell && \
    # --- Clean ---
    apt-get remove wget unzip -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
