###############################################################################
# Licensed Materials - Property of IBM Copyright IBM Corporation 2019. All Rights Reserved.
# U.S. Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP
# Schedule Contract with IBM Corp.
#
# Contributors:
#  IBM Corporation - initial API and implementation
###############################################################################

include build/Configfile

-include $(shell curl -H 'Authorization: token ${GITHUB_TOKEN}' -H 'Accept: application/vnd.github.v4.raw' -L https://api.github.com/repos/open-cluster-management/build-harness-extensions/contents/templates/Makefile.build-harness-bootstrap -o .build-harness-bootstrap; echo .build-harness-bootstrap)

default::
	@echo "Build Harness Bootstrapped"

install:
	npm install

lint:
	npm run lint

prune:
	npm prune --production

build-prod:
	npm run build:production

unit-test: install
	if [ ! -d "test-output" ]; then \
		mkdir test-output; \
	fi
	npm test


# include Configfile

# SHELL := /bin/bash

# # GITHUB_USER containing '@' char must be escaped with '%40'
# GITHUB_USER := $(shell echo $(GITHUB_USER) | sed 's/@/%40/g')
# GITHUB_TOKEN ?=

# DOCKER_USER := $(shell echo $(DOCKER_USERNAME))
# DOCKER_PASS := $(shell echo $(DOCKER_PASSWORD))

# DOCKER_BUILD_OPTS = --build-arg "VCS_REF=$(GIT_COMMIT)" \
# 										--build-arg "VCS_URL=$(GIT_REMOTE_URL)" \
# 										--build-arg "IMAGE_NAME=$(IMAGE_NAME)" \
# 										--build-arg "IMAGE_DESCRIPTION=$(IMAGE_DESCRIPTION)" \
# 										--build-arg "IMAGE_DISPLAY_NAME=$(IMAGE_DISPLAY_NAME)" \
# 										--build-arg "IMAGE_NAME_ARCH=$(IMAGE_NAME_ARCH)" \
# 										--build-arg "IMAGE_MAINTAINER=$(IMAGE_MAINTAINER)" \
# 										--build-arg "IMAGE_VENDOR=$(IMAGE_VENDOR)" \
# 										--build-arg "IMAGE_VERSION=$(IMAGE_VERSION)" \
# 										--build-arg "IMAGE_DESCRIPTION=$(IMAGE_DESCRIPTION)" \
# 										--build-arg "IMAGE_SUMMARY=$(IMAGE_SUMMARY)" \
# 										--build-arg "IMAGE_OPENSHIFT_TAGS=$(IMAGE_OPENSHIFT_TAGS)"

# ifneq ($(ARCH), x86_64)
# DOCKER_FILE = Dockerfile.$(ARCH)
# else
# DOCKER_FILE = Dockerfile
# endif
# @echo "using DOCKER_FILE: $(DOCKER_FILE)"

# .PHONY: default
# default:: init;

# .PHONY: init\:
# init::
# ifndef GITHUB_USER
# 	$(info GITHUB_USER not defined)
# 	exit 1
# endif
# 	$(info Using GITHUB_USER=$(GITHUB_USER))
# ifndef GITHUB_TOKEN
# 	$(info GITHUB_TOKEN not defined)
# 	exit 1
# endif

# .PHONY: copyright-check
# copyright-check:
# 	./copyright-check.sh

# lint:
# 	npm run lint

# install:
# 	npm install

# prune:
# 	npm prune --production

# .PHONY: build
# build:
# 	npm run build:production

# -include $(shell curl -fso .build-harness -H "Authorization: token $(GITHUB_TOKEN)" -H "Accept: application/vnd.github.v3.raw" "https://raw.github.ibm.com/ICP-DevOps/build-harness/master/templates/Makefile.build-harness"; echo .build-harness)

# .PHONY: run
# run: check-env app-version
# 	docker run \
# 	-e NODE_ENV=development \
# 	-e PLATFORM_IDENTITY_PROVIDER_URL=$(PLATFORM_IDENTITY_PROVIDER_URL) \
# 	-d -p $(HOST):$(APP_PORT):$(CONTAINER_PORT) $(IMAGE_REPO)/$(IMAGE_NAME_ARCH):$(IMAGE_VERSION)

# push: check-env app-version

# .PHONY: test
# test:
# ifeq ($(UNIT_TESTS), TRUE)
# 	if [ ! -d "test-output" ]; then \
# 		mkdir test-output; \
# 	fi
# 	npm test
# 	# @$(SELF) cicd-log-test LOG_TEST_OUTPUT_DIR=test-output
# endif

# ################################################### moved from Makefile.docker
# .PHONY: docker-logins
# docker-logins:
# ifndef $(and DOCKER_USERNAME, DOCKER_PASSWORD)
# 	$(error DOCKER_USERNAME and DOCKER_PASSWORD must be defined, required for goal (docker-login))
# endif
# 	@docker login -u $(DOCKER_USERNAME) -p $(DOCKER_PASSWORD) $(DOCKER_EDGE_REGISTRY)
# 	@docker login -u $(DOCKER_USERNAME) -p $(DOCKER_PASSWORD) $(DOCKER_SCRATCH_REGISTRY)
# 	@docker login -u $(DOCKER_USERNAME) -p $(DOCKER_PASSWORD) $(DOCKER_INTEGRATION_REGISTRY)


# .PHONY: push
# push: check-env app-version
# 	make docker:tag-arch DOCKER_REGISTRY=$(DOCKER_SCRATCH_REGISTRY) DOCKER_TAG=$(GIT_COMMIT)
# 	make docker:push-arch DOCKER_REGISTRY=$(DOCKER_SCRATCH_REGISTRY) DOCKER_TAG=$(GIT_COMMIT)

# .PHONY: release
# release:
# 	make docker:tag-arch DOCKER_REGISTRY=$(DOCKER_INTEGRATION_REGISTRY) DOCKER_TAG=$(RELEASE_TAG)
# 	make docker:push-arch DOCKER_REGISTRY=$(DOCKER_INTEGRATION_REGISTRY) DOCKER_TAG=$(RELEASE_TAG)
# 	make docker:tag-arch DOCKER_REGISTRY=$(DOCKER_INTEGRATION_REGISTRY) DOCKER_TAG=$(SEMVERSION)
# 	make docker:push-arch DOCKER_REGISTRY=$(DOCKER_INTEGRATION_REGISTRY) DOCKER_TAG=$(SEMVERSION)
# ifeq ($(OSARCH), linux-amd64)
# 	make docker:tag-arch DOCKER_REGISTRY=$(DOCKER_INTEGRATION_REGISTRY) DOCKER_TAG=$(RELEASE_TAG_RED_HAT)
# 	make docker:push-arch DOCKER_REGISTRY=$(DOCKER_INTEGRATION_REGISTRY) DOCKER_TAG=$(RELEASE_TAG_RED_HAT)
# 	make docker:tag-arch DOCKER_REGISTRY=$(DOCKER_INTEGRATION_REGISTRY) DOCKER_TAG=$(SEMVERSION_RED_HAT)
# 	make docker:push-arch DOCKER_REGISTRY=$(DOCKER_INTEGRATION_REGISTRY) DOCKER_TAG=$(SEMVERSION_RED_HAT)
# endif

# .PHONY: multi-arch
# multi-arch:
# 	make docker:manifest-tool
# 	make docker:multi-arch DOCKER_TAG=$(SEMVERSION)

# .PHONY: print_vars
# print_vars:
# 	@echo "SEMVERSION = $(SEMVERSION)"
# 	@echo "IMAGE_VERSION = $(IMAGE_VERSION)"
# 	@echo "DOCKER_BUILD_TAG = $(DOCKER_BUILD_TAG)"
# 	@echo "RELEASE_TAG = $(RELEASE_TAG)"
# 	@echo "DOCKER_REGISTRY = $(DOCKER_REGISTRY)"

# .PHONY: image
# image: build lint prune
# 	make docker:info
# 	make docker:build

# .PHONY: app-version
# app-version:
# 	$(eval WORKING_CHANGES := $(shell git status --porcelain))
# 	$(eval BUILD_DATE := $(shell date +%m/%d@%H:%M:%S))
# 	$(eval GIT_COMMIT := $(shell git rev-parse --short HEAD))
# 	$(eval VCS_REF := $(if $(WORKING_CHANGES),$(GIT_COMMIT)-$(BUILD_DATE),$(GIT_COMMIT)))
# 	$(eval APP_VERSION ?= $(if $(shell cat VERSION 2> /dev/null),$(shell cat VERSION 2> /dev/null),0.0.1))
# 	$(eval IMAGE_VERSION ?= $(APP_VERSION)-$(GIT_COMMIT))
# 	@echo "App: $(IMAGE_NAME_ARCH) $(IMAGE_VERSION)"

# .PHONY: check-env
# check-env:
# ifndef IMAGE_REPO
# 	$(error IMAGE_REPO is undefined)
# endif
# ifndef IMAGE_NAME
# 	$(error IMAGE_NAME is undefined)
# endif
# ifneq ($(ARCH), x86_64)
# 	$(eval DOCKER_FLAG = -f Dockerfile.$(ARCH))
# endif

# .PHONY: test-image-size
# test-image-size:: check-env app-version
# 	@echo "Testing image size: $(IMAGE_REPO)/$(IMAGE_NAME_ARCH):$(IMAGE_VERSION)"
# 	$(eval IMAGE_SIZE= $(shell docker inspect --format='{{.Size}}' $(IMAGE_REPO)/$(IMAGE_NAME_ARCH):$(IMAGE_VERSION) ) )
# 	@echo "Image Size: $(IMAGE_SIZE)"
# 	@if [ $(IMAGE_SIZE) -gt $(MAX_IMAGE_SIZE) ]; then \
# 		echo ERROR: image size greater than $(MAX_IMAGE_SIZE); \
# 		exit 2; \
# 	fi

# .PHONY: show-labels
# show-labels: app-version
# 	@docker inspect $(IMAGE_REPO)/$(IMAGE_NAME_ARCH):$(IMAGE_VERSION) --format='{{json .Config.Labels}}' | tr , '\n' | tr -d '{' | tr -d '}'

# include Makefile.cicd
