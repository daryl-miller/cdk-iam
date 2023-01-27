#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkIamStack } from '../lib/cdk-iam-stack';

const app = new cdk.App();
new CdkIamStack(app, 'CdkIamStack', {
  env: {
      account: '589560249530',
      region: 'ap-southeast-2'
  }
});