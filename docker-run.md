# Docker execution

## Docker image build

build:

```bash
docker build -t <site>:<latest> .
```

## Docker run command

run:

```bash
docker run -d --name <image-name> -p 80:80 <ecr-uri>/<image-name>:<tag>
```

## Docker compose run

docker compose:

```bash
docker compose up -d --build
```
