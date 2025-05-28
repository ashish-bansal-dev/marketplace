# Storefront Setup Guide

## Initial Setup

1. Navigate to the storefront directory:

   ```bash
   cd ../storefront
   ```

2. Create your environment file:

   ```bash
   cp .env.template .env
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

## Configure Publishable API Key

1. Access the Medusa Admin Panel at [http://localhost:9000/app/settings/publishable-api-keys](http://localhost:9000/app/settings/publishable-api-keys)

   - **Login credentials**:
     - Email: `admin@test.com`
     - Password: `supersecret`

2. Copy the token key labeled "Webshop"

3. Open `storefront/.env` and set the value for `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`

## Launch the Application

Start the development server:

```
# Start Medusa storefront
yarn dev
```
