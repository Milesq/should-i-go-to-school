require('dotenv').config();

import downloadData from './downloadData';

downloadData().catch(error => {
    console.log(error);
    process.exit();
});
