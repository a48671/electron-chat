import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';
import { App } from "./app";

const domNode = document.getElementById('chatApp');
const root = createRoot(domNode);

root.render(<App />);
