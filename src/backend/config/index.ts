import configProd from './config';
import configDev from './configDev';

const config: typeof configProd = configProd;
Object.keys(configDev).forEach(key => {
    if (typeof config[key] === 'object') {
        config[key] = { ...config[key], ...configDev[key], };
    }
    else {
        config[key] = configDev[key];
    }
});

export default config;