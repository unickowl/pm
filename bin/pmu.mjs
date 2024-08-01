#!/usr/bin/env node
import { run } from '../dist/index.mjs';
run(['pmu', ...process.argv.slice(2)]);