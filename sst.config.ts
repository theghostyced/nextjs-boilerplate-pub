import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { HttpVersion } from "aws-cdk-lib/aws-cloudfront";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { HostedZone } from "aws-cdk-lib/aws-route53";


const Config = {
  production: {
    hostedZoneDomain: process.env.HOSTED_ZONE_DOMAIN, // "fk-kit.net",
    domainName: process.env.PROD_DOMAIN, // "nextjs.fk-kit.net",
    certificateArn: process.env.PROD_CERTIFICATE_ARN, // "arn:aws:acm:us-east-1:993806592074:certificate/cbce8bcd-a71c-401b-a052-cd7f3f8151b9",
  },

  staging: {
    domainName: process.env.STAGING_DOMAIN,
    certificateArn: process.env.STAGING_CERTIFICATE_ARN,
  },

  qa: {
    domainName: process.env.QA_DOMAIN, // "nextjs-qa.fk-kit.net",
    certificateArn: process.env.QA_CERTIFICATE_ARN,
    basicAuthTokens: [
      "ZmljdGl2ZTpmazkwMDA=",
      /* Buffer.from(`qauser:${client}-internal`).toString('base64'), */
    ],
  },
};

Config.getValue = (stack, key) => {
    if (Config[stack.stage]) {
      return Config[stack.stage][key] || Config.production[key];
    }

    return Config.production[key];
};

const cdkOptions = (stack) => {
  const options = {
    server: {
      logRetention: RetentionDays.ONE_MONTH,
    },
    distribution: {
      httpVersion: HttpVersion.HTTP2_AND_3,
    },
  };

  const tokens = Config.getValue(stack, "basicAuthTokens");
  if (tokens) {
    options.transform = (plan) => {
      plan.cloudFrontFunctions.serverCfFunction.injections.push(`
        var basicAuthTokens = [
          "Basic ${tokens.join("\",\"Basic ")}",
        ];
        if (basicAuthTokens) {
          var authHeaders = request.headers.authorization;
          if (authHeaders) {
            if (authHeaders.value && basicAuthTokens.includes(authHeaders.value)) {
              return request;
            }
          }

          return {
            statusCode: 401,
            statusDescription: "Unauthorized",
            headers: {
              "www-authenticate": {
                value: 'Basic realm="restricted"'
              }
            }
          };

        } else {
          return request;
        }
      `);
    };
  }

  return options;
};

export default {
  config(_input) {
    return {
      name: "nextjs-bootstrap",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const domainName = Config.getValue(stack, "domainName");

      const options = {
        cdk: cdkOptions(stack),
      };

      if (domainName) {
        options.customDomain = {
          domainName: domainName,
          cdk: {},
        };

        const hostedZoneDomain = Config.getValue(stack, "hostedZoneDomain");
        const certificateArn = Config.getValue(stack, "certificateArn");

        if (hostedZoneDomain) {
          options.customDomain.cdk.hostedZone = HostedZone.fromLookup(
            stack,
            "HostedZone",
            {
              domainName: hostedZoneDomain,
            },
          );
        }
        if (certificateArn) {
          options.customDomain.cdk.certificate = Certificate.fromCertificateArn(
            stack,
            "Certficate",
            certificateArn,
          );
        }
      }

      const site = new NextjsSite(stack, "Site", options);

      stack.addOutputs({
        SiteUrl: site.customDomainUrl,
      });
    });
  },
} satisfies SSTConfig;
