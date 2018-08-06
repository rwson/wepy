import path from 'path';
import fs from 'fs';
import { wxml2json, json2wxml } from './lib';

const stream = fs.createWriteStream(path.join(__dirname, '../log.txt'), {
    encoding: 'utf8'
});

class Helper {

    static parseWxml(file, code) {
        const baseInfo = {
            dirname: path.dirname(file),
            filename: path.basename(file)
        };
        try {
            return {
                ...baseInfo,
                obj: wxml2json(code),
                error: null
            };
        } catch (error) {
            return {
                ...baseInfo,
                obj: null,
                error: {
                    message: error.message,
                    stack: error.stack
                }
            };
        }
    }


    static toWxml(code) {
        try {
            return json2wxml(code);
        } catch (error) {
            return '';
        }
    }
}

export default class {

    constructor(cfg) {
        this.cfg = {
            ...cfg
        };
    }

    apply(op) {
        const { code, file } = op;
        if (/\.wxml$/.test(file)) {
            stream.write('====================================\n');
            stream.write(JSON.stringify(Helper.parseWxml(file, code), '\n', 2));
            stream.write('\n');
            stream.write('====================================\n\n\n');
        }

        // stream.write(file);
        // stream.write(/\.wxml$/.test(file));

        // if (/\.wxml$/.test(file)) {
            
        // } else {
            
        // }

        op.next();
    }

}