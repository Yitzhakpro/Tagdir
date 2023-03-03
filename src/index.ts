#!/usr/bin/env node
import Enhancer from "./Program";

const enhancer = new Enhancer();
enhancer.parse(process.argv);
