#!/usr/bin/env node
'use strict';

const dns = require('dns');
const gictivity = require('gictivity');
const chalk = require('chalk');
const ora = require('ora');
const logUpdate = require('log-update');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();

const spinner = ora();

const arg = process.argv[2];
const getArg = process.argv[3];

const pre = `${chalk.bold.cyan('›')} `;
const message = `${chalk.dim(`username required`)}`;

dns.lookup('github.com', err => {
	if (err && err.code === 'ENOTFOUND') {
		logUpdate();
		console.log(`${chalk.red('›')} ${chalk.dim('Please check your internet connection\n')}`);
		process.exit(1);
	}
});

if (!arg || arg === '--help') {
	console.log(`
 ${chalk.cyan('Usage   :')} gic [command] <${chalk.bold('username')}>

 ${chalk.cyan('Command :')}
 ${chalk.bold('-p')}, ${chalk.dim('--pinned')}     Pinned repository of a github user
 ${chalk.bold('-d')}, ${chalk.dim('--day')}        Total contributions made in a day
 ${chalk.bold('-h')}, ${chalk.dim('--half')}       Total contributions made in 3 days
 ${chalk.bold('-w')}, ${chalk.dim('--week')}       Total contributions made in a complete week
 ${chalk.bold('-m')}, ${chalk.dim('--month')}      Total contributions made in a month
 ${chalk.bold('-y')}, ${chalk.dim('--year')}       Total commits pushed in a year
	`);
}

if (arg === '-p' || arg === '--pinned') {
	if (!getArg) {
		console.log(`\n${pre}${message}\n`);
		process.exit(1);
	}
	logUpdate();
	spinner.start();
	spinner.text = chalk.dim(`Fetching pinned repositories of ${chalk.bold(getArg)}`);
	gictivity.pin(getArg).then(user => {
		const inf = [];
		const pinnedRepo = (prefix, key) => {
			if (user[key]) {
				inf.push(`${prefix}${user[key]}`);
			}
		};
		logUpdate();
		pinnedRepo(`${pre}`, 'repo1');
		pinnedRepo(`${pre}`, 'repo2');
		pinnedRepo(`${pre}`, 'repo3');
		pinnedRepo(`${pre}`, 'repo4');
		pinnedRepo(`${pre}`, 'repo5');
		console.log(inf.join('\n'));
		console.log();
		spinner.stop();
	});
}

if (arg === '-d' || arg === '--day') {
	if (!getArg) {
		console.log(`\n${pre}${message}\n`);
		process.exit(1);
	}
	logUpdate();
	spinner.start();
	spinner.text = chalk.dim(`Fetching contributions made by ${chalk.bold(getArg)} in a day`);
	gictivity.day(getArg).then(user => {
		const inf = [];
		const dayContribution = (prefix, key) => {
			if (user[key]) {
				inf.push(`${prefix}${user[key]}`);
			}
		};
		logUpdate();
		dayContribution(`${pre}`, 'commits');
		dayContribution(`${pre}`, 'pulls');
		dayContribution(`${pre}`, 'issues');
		console.log(inf.join('\n'));
		console.log();
		spinner.stop();
	});
}

if (arg === '-h' || arg === '--half') {
	if (!getArg) {
		console.log(`\n${pre}${message}\n`);
		process.exit(1);
	}
	logUpdate();
	spinner.start();
	spinner.text = chalk.dim(`Fetching contributions made by ${chalk.bold(getArg)} in 3 days`);
	gictivity.days(getArg).then(user => {
		const inf = [];
		const daysContribution = (prefix, key) => {
			if (user[key]) {
				inf.push(`${prefix}${user[key]}`);
			}
		};
		logUpdate();
		daysContribution(`${pre}`, 'commits');
		daysContribution(`${pre}`, 'pulls');
		daysContribution(`${pre}`, 'issues');
		console.log(inf.join('\n'));
		console.log();
		spinner.stop();
	});
}

if (arg === '-w' || arg === '--week') {
	if (!getArg) {
		console.log(`\n${pre}${message}\n`);
		process.exit(1);
	}
	logUpdate();
	spinner.start();
	spinner.text = chalk.dim(`Fetching contributions made by ${chalk.bold(getArg)} in a week`);
	gictivity.week(getArg).then(user => {
		const inf = [];
		const weekContribution = (prefix, key) => {
			if (user[key]) {
				inf.push(`${prefix}${user[key]}`);
			}
		};
		logUpdate();
		weekContribution(`${pre}`, 'commits');
		weekContribution(`${pre}`, 'pulls');
		weekContribution(`${pre}`, 'issues');
		console.log(inf.join('\n'));
		console.log();
		spinner.stop();
	});
}

if (arg === '-m' || arg === '--month') {
	if (!getArg) {
		console.log(`\n${pre}${message}\n`);
		process.exit(1);
	}
	logUpdate();
	spinner.start();
	spinner.text = chalk.dim(`Fetching contributions made by ${chalk.bold(getArg)} in a month`);
	gictivity.month(getArg).then(user => {
		const inf = [];
		const monthContribution = (prefix, key) => {
			if (user[key]) {
				inf.push(`${prefix}${user[key]}`);
			}
		};
		logUpdate();
		monthContribution(`${pre}`, 'commits');
		monthContribution(`${pre}`, 'pulls');
		monthContribution(`${pre}`, 'issues');
		console.log(inf.join('\n'));
		console.log();
		spinner.stop();
	});
}

if (arg === '-y' || arg === '--year') {
	if (!getArg) {
		console.log(`\n${pre}${message}\n`);
		process.exit(1);
	}
	logUpdate();
	spinner.start();
	spinner.text = chalk.dim(`Fetching total contributions made by ${chalk.bold(getArg)} in a year`);
	gictivity.year(getArg).then(user => {
		const inf = [];
		const yearContribution = (prefix, key) => {
			if (user[key]) {
				inf.push(`${prefix}${user[key]}`);
			}
		};
		logUpdate();
		yearContribution(`${pre}`, 'contributions');
		console.log(inf.join('\n'));
		console.log();
		spinner.stop();
	});
}
