import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import { JssProvider, SheetsRegistry } from 'react-jss';

import Button from "./button/button";
import Title from "./title/title";

global.React = React;
global.ReactDOM = ReactDOM;
global.ReactDOMServer = ReactDOMServer;
global.ReactJss = { JssProvider, SheetsRegistry };

global.Components = { Button, Title };
