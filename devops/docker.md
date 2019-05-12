# Docker and docker compose cheat sheet

## Docker

Before we get into the best practices for using Docker, here’s a quick overview of the vocabulary you should know:

- **Layer**: a set of read-only files or commands that describe how to set up the underlying system beneath the container. Layers are built on top of each other, and each one represents a change to the filesystem.
- **Image**: an immutable layer that forms the base of the container.
- **Container**: an instance of the image that can be executed as an independent application. The container has a mutable layer that lies on top of the image and that is separate from the underlying layers.
- **Registry**: a storage and content delivery system used for distributing Docker images.
- **Repository**: a collection of related Docker images, often different versions of the same application.

With that refresher in mind, here are some quick tips for building applications with Docker:
Try to keep your images as small as possible. This will make them easier to transfer and faster to load into memory when starting a new container. Don’t include libraries and dependencies unless they’re an absolute requirement for the application to run.
If your application needs to be scalable, consider using Docker Swarm, a tool for managing a cluster of nodes as a single virtual system.
For maximum efficiency, use Docker in combination with continuous integration and continuous deployment practices. You can use services such as Docker Cloud to automatically build images from source code and push them to a Docker repository.
Below, you’ll find all of the basic Docker commands that you need to start working with containers:

```sh
# Developing with Docker Containers:

docker create [image]  # Create a new container from a particular image.
docker login  # Log into the Docker Hub repository.
docker pull [image]  # Pull an image from the Docker Hub repository.
docker push [username/image]  # Push an image to the Docker Hub repository.
docker search [term]  # Search the Docker Hub repository for a particular term.
docker tag [source][target]  # Create a target tag or alias that refers to a source image.
 # Running Docker Containers
docker start [container]  # Start a particular container.
docker stop [container]  # Stop a particular container.
docker exec -ti [container][command]  # Run a shell command inside a particular container.
docker run -ti — image [image][container] [command]  # Create and start a container at the same time, and then run a command inside it.
docker run -ti — rm — image [image][container] [command]  # Create and start a container at the same time, run a command inside it, and then remove the container after executing the command.
docker pause [container]  # Pause all processes running within a particular container.

# Using Docker Utilities

docker history [image]  # Display the history of a particular image.
docker images  # List all of the images that are currently stored on the system.
docker inspect [object]  # Display low-level information about a particular Docker object.
docker ps  # List all of the containers that are currently running.
docker version  # Display the version of Docker that is currently installed on the system.

# Cleaning Up Your Docker Environment:


docker kill [container]        # Kill a particular container.
docker kill $(docker ps -q)    # Kill all containers that are currently running.
docker rm [container]          # Delete a particular container that is not currently running.
docker rm $(docker ps -a -q)   # Delete all containers that are not currently running.
```

## Docker-compose:

```sh
$ docker-compose up -d         # start containers in background
$ docker-compose kill          # stop containers
$ docker-compose up -d --build # force rebuild of Dockerfiles
$ docker-compose rm            # remove stopped containers
$ docker ps                    # see list of running containers
$ docker exec -ti [NAME] bash  # ssh to the container

# list all images
docker images
# tag and publishing
docker tag <id> buonzz/name:version
docker login
docker push buonzz/name
# delete image
docker rmi -f <id>
# run an image
docker run yourusername/docker-whale
# view logs
docker logs [OPTIONS] CONTAINER
# set the port to expose in host
docker run -p 3000 my_image
# start new container interactively
docker container run -it
```

### Instructions on using docker-compose files

```sh
# docker-compsoe version to be used must be mentioned at the top
version: '3'
services:
  web:
    build: .
    ports:
     - "5000:5000"
  redis:
    image: "redis:alpine"

# Each container runs as a different service
```

You can mention the dockerfile name in the build. Mostly build "." works always.

```sh
version: '2'
services:
  webapp:
    build:
      context: ./dir
      dockerfile: Dockerfile-alternate
      args:
        buildno: 1

version: '2'
services:
  webapp:
    build: .
```

If you specify image as well as build, then Compose names the built image with the webapp and optional tag specified in image

```sh
build: ./dir
image: webapp:tag
```

In this general example, the redis service is constrained to use no more than 50M of memory and 0.50 (50%) of available processing time (CPU), and has 20M of memory and 0.25 CPU time reserved (as always available to it).

```sh
version: '3'
services:
  redis:
    image: redis:alpine
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 50M
        reservations:
          cpus: '0.25'
          memory: 20M
```

### Environments

Environment variables can be defined in multiple ways

```sh
environment:
  RACK_ENV: development
  SHOW: 'true'
  SESSION_SECRET:

environment:
  - RACK_ENV=development
  - SHOW=true
  - SESSION_SECRET
```

### expose

Expose ports without publishing them to the host machine - they’ll only be accessible to linked services. Only the internal port can be specified.

```sh
expose:
 - "3000"
 - "8000"
```

### external_links

Link to containers started outside this docker-compose.yml or even outside of Compose, especially for containers that
provide shared or common services. external_links follow semantics similar to links when specifying both the container
name and the link alias (CONTAINER:ALIAS).

```sh
external_links:
 - redis_1
 - project_db_1:mysql
 - project_db_1:postgresql
```

### restart

no is the default restart policy, and it will not restart a container under any circumstance.
When always is specified, the container always restarts.
The on-failure policy restarts a container if the exit code indicates an on-failure error.

```sh
  - restart: no
  - restart: always
  - restart: on-failure
```

### volumes

```sh
volumes:
  # Just specify a path and let the Engine create a volume
  - /var/lib/mysql

  # Specify an absolute path mapping
  - /opt/data:/var/lib/mysql

  # Path on the host, relative to the Compose file
  - ./cache:/tmp/cache

  # User-relative path
  - ~/configs:/etc/configs/:ro

  # Named volume
  - datavolume:/var/lib/mysql
```

```sh
volumes_from:
 - service_name
 - service_name:ro
 - container:container_name
 - container:container_name:rw
```
