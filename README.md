#  SmartToolbox Frontend

## Table of Contents
[[_TOC_]]

## Introduction


## Webapp configuration 


## Prerequisited

* Docker
* docker-compose
* Nodejs (for development)

## Quick setup
In the root directory, run `docker-compose up`

## Setup for development
The development environment used was VS Code.

### install dependencies
`npm install`

### serve with hot reload at localhost:8000
`npm run localdev`

### build for production with minification
`npm run build`

## Docker setup

### build docker image
`docker build -t surveyappfront . --no-cache`

### run docker image
`docker run -it -p 4000:80 surveyappfront`