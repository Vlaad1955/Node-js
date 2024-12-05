const fs = require('node:fs/promises');

const Stat = async (somePath) =>{
    const stat = await fs.stat(somePath)
    if (stat.isFile()) {
        console.log(`Створено файл`);
    }
    else {
        console.log(`Створена папка`);
    }
}

module.exports = Stat;