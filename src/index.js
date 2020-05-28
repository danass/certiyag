
//modules
const express = require("express");
const site = express();
const _ = require("lodash");
const http = require('http');
const https = require('https');
const fs = require("fs");

require('../sites/certificats')(site);
//require('./sites/acte')(site);