#!/bin/bash
fsmonitor -p -d public/javascripts '!index.js' '!templates.js' '!application.js' ember build -d

