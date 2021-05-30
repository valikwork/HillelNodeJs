const availableEnv = ['dev', 'prod'];

const { NODE_ENV } = process.env;
process.env.NODE_ENV = availableEnv.some(e => e === NODE_ENV) ? NODE_ENV : 'prod';