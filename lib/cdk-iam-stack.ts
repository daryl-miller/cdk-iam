import * as cdk from 'aws-cdk-lib';
import { SecretValue } from 'aws-cdk-lib';
import { AccessKey, Effect, PolicyStatement, Role, User } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager'
export class CdkIamStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const route53GetChangePolicy = new PolicyStatement({
      actions: ['route53:GetChange'],
      effect: Effect.ALLOW,
      resources: ['arn:aws:route53:::change/*']
    })
    const route53ChangeResourceRecordSetsPolicy = new PolicyStatement({
      actions: [        
        'route53:ChangeResourceRecordSets',
        'route53:ListResourceRecordSets'],
      effect: Effect.ALLOW,
      resources: ['arn:aws:route53:::hostedzone/*']
    })
    const route53ListHostedZonesByNamePolicy = new PolicyStatement({
      actions: ['route53:ListHostedZonesByName'],
      effect: Effect.ALLOW,
      resources: ['*']
    })
    const kubernetsUser = new User(this, 'kubernetesDNSCertManagerUser');
    const certbotUser = new User(this, 'certBotDNSCertManagerUser');

    const dnsMangerRole = new Role(this, 'kubernetesDNSCertManagerRole', {
      assumedBy: kubernetsUser
    })

    dnsMangerRole.grantAssumeRole(certbotUser)

    dnsMangerRole.addToPolicy(route53GetChangePolicy)
    dnsMangerRole.addToPolicy(route53ChangeResourceRecordSetsPolicy)
    dnsMangerRole.addToPolicy(route53ListHostedZonesByNamePolicy)
  }
}
