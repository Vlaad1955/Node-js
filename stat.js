const fs = require('node:fs/promises');
const path = require('path');

const Stat = async (folderPath) => {
    const entries = await fs.readdir(folderPath, { withFileTypes: true });

    console.log(folderPath);

    for (const entry of entries) {
        const fullPath = path.join(folderPath, entry.name);
        if (entry.isDirectory()) {
            console.log(`Це папка`);
            await Stat(fullPath);
        } else if (entry.isFile()) {
            console.log(`Це файл`);
            console.log(fullPath);
        }
    }
};

module.exports = Stat;