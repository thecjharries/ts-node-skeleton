// Prompt colors

// Promise-based exec
const execThenable = require('node-exec-promise').exec;
// Promise-based fs
const fsp = require('fs-promise');
// Git manipulation
const git = require('simple-git')();
// Join pathes across environments
const path = require('path');
// Optimized promise library
const Promise = require('bluebird');
// Handle stdout/stdin
const prompt = require('prompt');

prompt.message = colors.green('node-skeleton');
prompt.delimiter = colors.green(': ');

let remote = null;

// Collects results from prompt and writes them to package.json
function writePackageJson(results) {
    if (results.packageRepo.length > 0) {
        remote = results.packageRepo;
    }
    return fsp.readFile(path.join(__dirname, 'finalPackage.json'), 'utf-8')
        .then((contents) => {
            return contents
                .replace(
                    /<packageName>/gi,
                    results.packageName || defaultName
                )
                .replace(
                    /<packageDesc>/gi,
                    results.packageDesc || defaultDesc
                )
                .replace(
                    /<packageVersion>/gi,
                    results.packageVersion || defaultVersion
                )
                .replace(
                    /<packageAuthor>/gi,
                    results.packageAuthor || defaultAuthor
                )
                .replace(
                    /<packageLicense>/gi,
                    results.packageLicense || defaultLicense
                )
                .replace(
                    /<packageRepo>/gi,
                    results.packageRepo
                )
                .replace(
                    / +"repository": "",\n/gi,
                    ''
                );
        })
        .then((contents) => {
            fsp.writeFile(path.join(__dirname, 'package.json'), contents);
        })
        .then(() => {
            return fsp.readFile(path.join(__dirname, 'README.md'), 'utf-8')
        })
        .then((contents) => {
            return fsp.writeFile(
                path.join(__dirname, 'README.md'),
                contents
                    .replace(/\n\[\]\(start\)[\s\S]*\[\]\(end\)\n/gi, '')
                    .replace(/node-skeleton/gi, results.packageName)
            );
        });
}

// Nukes old git and replaces with a fresh repo
function wipeGit() {
    return fsp.remove(path.join(__dirname, '.git'))
        .then(() => {
            return new Promise((resolve, reject) => {
                git.init(() => {
                    if (remote) {
                        git.addRemote('origin', remote, resolve);
                    } else {
                        resolve();
                    }
                });
            });
        });
}

// Cleans up README and removes all working files
function cleanUp() {
    return fsp
        .remove(path.join(__dirname, 'finalPackage.json'))
        .then(() => {
            return fsp.remove(path.join(__dirname, 'build.js'));
        })
        .then(() => {
            return execThenable('npm prune');
        })
        .then((stdout) => {
            console.log(stdout);
            return execThenable('npm install');
        })
        .then((stdout) => {
            console.log(stdout);
            return;
        });
}

// Kills the process
function exit() {
    process.exit();
}

new Promise((resolve, reject) => {
        prompt.start();

        prompt.get(promptProperties, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    })
    .then(writePackageJson)
    .then(wipeGit)
    .then(cleanUp)
    .then(exit)
    .catch((error) => {
        console.log(error);
    });
