const Stat = require('./stat');
const fs = require('node:fs/promises');
const path = require('path');

const hw = async () => {
    const baseFolderPath = path.join(process.cwd(), 'baseFolder');
    await fs.mkdir(baseFolderPath, { recursive: true });

    for (let i = 1; i < 6; i++) {
        const derFolderPath = path.join(baseFolderPath, `${i}`);
        await fs.mkdir(derFolderPath);

        for (let y = 1; y < 6; y++) {
            const filePath = path.join(derFolderPath, `${y}.txt`);
            await fs.writeFile(filePath, `${i}.${y}`);
        }
    }

    await Stat(baseFolderPath);
};

void hw();