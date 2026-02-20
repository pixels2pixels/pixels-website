# AWS Deployment Guide for Pixels2Pixels Website

This guide provides instructions for deploying the Pixels2Pixels Next.js application to AWS. We recommend using **AWS Amplify** for the simplest, most integrated deployment experience. An alternative using S3, CloudFront, and Lambda@Edge is also described for more advanced use cases.

## Table of Contents

- [Recommended: AWS Amplify](#recommended-aws-amplify)
  - [Prerequisites](#prerequisites)
  - [Step-by-Step Guide](#step-by-step-guide)
  - [Configuring Environment Variables](#configuring-environment-variables)
- [Alternative: S3, CloudFront, and Lambda@Edge](#alternative-s3-cloudfront-and-lambdaedge)
  - [Overview](#overview)
  - [Step 1: Configure SES for Contact Form](#step-1-configure-ses-for-contact-form)
  - [Step 2: Deploy with OpenNext](#step-2-deploy-with-opennext)

---

## Recommended: AWS Amplify

AWS Amplify provides a Git-based workflow for deploying and hosting full-stack web apps. It automatically handles the build process, server-side rendering, and CDN configuration for Next.js applications.

### Prerequisites

1.  An AWS account.
2.  The project code pushed to a Git repository (GitHub, GitLab, Bitbucket, or AWS CodeCommit).

### Step-by-Step Guide

1.  **Log in to the AWS Management Console** and navigate to the **AWS Amplify** service.

2.  Click **"New app"** and select **"Host web app"**.

3.  **Connect your Git provider** (e.g., GitHub) and authorize Amplify to access your repositories.

4.  **Select the repository** for the Pixels2Pixels website and the branch you want to deploy (e.g., `main`).

5.  **Build settings**: Amplify will automatically detect that this is a Next.js project and configure the build settings. The default `amplify.yml` should look similar to this:

    ```yaml
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: .next
        files:
          - "**/*"
      cache:
        paths:
          - node_modules/**/*
    ```

6.  **Review and deploy**: Click **"Save and deploy"**. Amplify will start the first build and deployment process. You can monitor the progress in the Amplify console.

7.  **Custom Domain**: Once the deployment is successful, you can add a custom domain by going to the **"Domain management"** tab in your Amplify app console.

### Configuring Environment Variables

To make the contact form work, you need to add the SES-related environment variables to your Amplify project.

1.  In the Amplify console, go to **"App settings" > "Environment variables"**.
2.  Click **"Manage variables"**.
3.  Add the following variables:

    -   `AWS_REGION`: The AWS region where you configured SES (e.g., `eu-central-1`).
    -   `AWS_ACCESS_KEY_ID`: The access key for an IAM user with SES permissions.
    -   `AWS_SECRET_ACCESS_KEY`: The secret access key for the same IAM user.
    -   `SES_FROM_EMAIL`: The verified email address in SES to send emails from.
    -   `SES_TO_EMAIL`: The email address where contact form submissions should be sent.
    -   `NEXT_PUBLIC_SITE_URL`: The final public URL of your site (e.g., `https://pixels2pixels.com`).

    **Security Note**: It is highly recommended to create a dedicated IAM user with a policy that only grants `ses:SendEmail` permissions to limit the security scope.

---

## Alternative: S3, CloudFront, and Lambda@Edge

This is a more manual but powerful approach that leverages the [OpenNext](https://open-next.js.org/) project to deploy a Next.js app to AWS primitives.

### Overview

OpenNext compiles your Next.js app into:
-   An S3 bucket for static assets (`_next/static`).
-   A Lambda function for the server-side rendering part.
-   A CloudFront distribution to route requests correctly.

### Step 1: Configure SES for Contact Form

Before deploying, you must configure Amazon Simple Email Service (SES) for the contact form.

1.  **Verify an Email Address**: In the SES console, verify the email address you want to send emails *from* (e.g., `noreply@pixels2pixels.com`) and *to* (e.g., `hello@pixels2pixels.com`).
2.  **Create IAM User**: Create an IAM user with programmatic access. Attach a policy that grants `ses:SendEmail` permissions. Save the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.
3.  **Request Production Access**: By default, SES is in a sandbox environment. You must request a quota increase to move to production and send emails to unverified addresses.

### Step 2: Deploy with OpenNext

Follow the [official OpenNext documentation](https://open-next.js.org/docs/getting-started) for the most up-to-date instructions. The general steps are:

1.  **Install OpenNext** in your project:

    ```bash
    npm install -D open-next
    ```

2.  **Add the OpenNext build command** to your `package.json`:

    ```json
    "scripts": {
      "build": "open-next build"
    }
    ```

3.  **Run the build**:

    ```bash
    npm run build
    ```

    This will create an `.open-next` directory containing the build artifacts (assets, server function, etc.).

4.  **Deploy to AWS**: Use the AWS CDK, Serverless Framework, or Terraform to deploy the artifacts created by OpenNext. OpenNext provides constructs and examples for these tools.

    You will need to configure your deployment script to pass the same environment variables mentioned in the Amplify section to the server Lambda function.
