import { App, Tags } from 'aws-cdk-lib';
import { FruitStack } from './fruit-stack';

const appName = 'dpra';
const app = new App({ context: { appName } });
const environmentName = app.node.tryGetContext('environmentName');
const stackName = environmentName ? `${environmentName}-${appName}` : appName;

new FruitStack(app, stackName, {
  deploymentConfigName: app.node.tryGetContext('deploymentConfigurationName'),
  natGateways: app.node.tryGetContext('natGateways'),
  description: `${appName} ${environmentName} deployment`,
  env: {
    account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
  },
});

Tags.of(app).add('Application', appName);
if (environmentName) {
  Tags.of(app).add('Environment', environmentName);
}

app.synth();