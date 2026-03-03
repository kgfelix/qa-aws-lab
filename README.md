# QA AWS LAB

A prototype for an AWS service testing lab.
The idea is to have a local environment for testing services that use the AWS ecosystem, before deploying to a staging or production environment.

### Prerequisites

* LocalStack
* Docker
* Terraform
* NodeJS

### Start infrastructure

```bash
docker compose up -d
```

### Create the bucket

From the terraform folder:

```bash
terraform init
terraform apply -auto-approve
```

### Test the app

Health check

```code
http://localhost:3000/health
```

```bash
curl -X POST http://localhost:3000/upload
```

### How to check if the container is running?

```bash
docker compose ps
```

You should see something like:

```bash
NAME        STATUS          PORTS
node-app    Up              0.0.0.0:3000->3000/tcp
localstack  Up              0.0.0.0:4566->4566/tcp
```

### Check logs

```bash
docker compose logs app
```

### Force rebuild

```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```
