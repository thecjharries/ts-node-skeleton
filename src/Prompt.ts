import * as Promise from 'bluebird';
import * as colors from 'colors/safe';
import PROMPT_PROPERTIES from './constants/PROMPT_PROPERTIES';
import { PromptResults } from './interfaces/PromptResults';

export default class Prompt {
    /** @type {any} I really need to find a def for this. */
    private prompt: any;

    public constructor() {
        this.prompt = require('prompt');
        this.prompt.message = colors.green('node-skeleton');
        this.prompt.delimiter = colors.green(': ');
        this.prompt.start();
        return this;
    }

    public queryUser(): Promise<PromptResults> {
        return new Promise((resolve, reject) => {
            return this.prompt.get(PROMPT_PROPERTIES, (error: any, results: PromptResults) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results);
            });
        });
    }
}
