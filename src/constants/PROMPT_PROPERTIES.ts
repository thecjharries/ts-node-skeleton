// Disable for a natural progression
/* tslint:disable:object-literal-sort-keys */

import * as colors from 'colors/safe';

const directory: any = __dirname.match(/[^\/\\]+$/);
let defaultName = 'ts-node-skeleton';
if (typeof directory !== 'undefined') {
    if (typeof directory[0] !== 'undefined') {
    defaultName = directory[0];
    }
}
const defaultDesc = '';
const defaultVersion = '1.0.0';
const defaultAuthor = 'CJ Harries <cj@wizardsoftheweb.pro>';
const defaultLicense = 'MIT';

export default {
    properties: {
        packageName: {
            description: colors.white(`Project name (${defaultName})`),
        },
        packageDesc: {
            description: colors.white(`Description ("${defaultDesc}")`),
        },
        packageVersion: {
            description: colors.white(`Version (${defaultVersion})`),
        },
        packageAuthor: {
            description: colors.white(`Author (${defaultAuthor})`),
        },
        packageLicense: {
            description: colors.white(`License (${defaultLicense})`),
        },
        packageRepo: {
            description: colors.white('Remote repo (optional)'),
        },
    },
};
