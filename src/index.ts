#!/usr/bin/env node
import ConfigMaster from './configMaster';

const configMaster = new ConfigMaster();
configMaster.parse(process.argv);
