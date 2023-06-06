import { App, Tags } from 'aws-cdk-lib';
// import { Accounts } from './accounts';
import { PipelineStack } from './pipeline';

// export const accounts = Accounts.load();

const appName = 'dpra';
const app = new App({ context: { appName } });
new PipelineStack(app, `${appName}-pipeline`, {
  description: `${appName} pipeline`,
  env: {
    account: '278334135690',
    region: process.env.CDK_DEFAULT_REGION,
  },
});

Tags.of(app).add('Application', appName);

app.synth();