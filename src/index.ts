#!/usr/bin/env node
import Confinger from './confinger';

const configMaster = new Confinger();
configMaster.parse(process.argv);
