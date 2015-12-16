#!/bin/bash
sudo apt-get update
# python 3
sudo apt-get install python3-setuptools --assume-yes
sudo easy_install3 pip 
sudo pip install virtualenv
alias python=python3
# Activate Virtual-ENV
virtualenv my_py3 --python=/usr/bin/python3
source my_py3/bin/activate
# deactive
sudo apt-get install git --assume-yes
sudo apt-get install nodejs --assume-yes
sudo apt-get install npm --assume-yes
sudo npm install -g bower
