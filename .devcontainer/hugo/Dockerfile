FROM klakegg/hugo:0.101.0-ext-ubuntu-ci

# ===== common area =====
ENV WORKSPACE_DIR "/workspace"
RUN apt-get update && apt-get -y install git curl wget jq \
    && mkdir -p $WORKSPACE_DIR
ENTRYPOINT [ "/bin/bash" ]