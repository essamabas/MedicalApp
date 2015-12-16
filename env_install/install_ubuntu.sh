#!/bin/bash
sudo apt-get update
# python 3
sudo apt-get install python3-setuptools
sudo easy_install3 pip
sudo pip install virtualenv
# Activate Virtual-ENV
virtualenv my_py3 --python=/usr/bin/python3
source my_py3/bin/activate
# deactive
sudo apt-get install git
sudo apt-get install nodejs-legacy
sudo npm install -g bower
