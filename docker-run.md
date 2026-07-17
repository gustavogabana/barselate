# Docker execution

## Docker image build

build:

```bash
docker build -t <site>:<latest> .
```

## Docker run command

run:

```bash
docker run -d --name baselarte-magnolia -p 80:80 <ecr-uri>/baselarte-magnolia:latest
```

## Docker compose run

docker compose:

```bash
docker compose up -d --build
```
