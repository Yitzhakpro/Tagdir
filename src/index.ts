#!/usr/bin/env node
import Tagdir from './tagdir';

const configMaster = new Tagdir();
configMaster.parse(process.argv);
