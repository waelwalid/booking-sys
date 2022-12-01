# Booking-sys
> Booking-sys- repository for Services Containerization

## Requirements
* [Docker](https://docs.docker.com/install/overview/) (or docker on a docker-machine-env for [macOS](https://docs.docker.com/machine/))
* [Docker Compose](https://docs.docker.com/compose/install/)
* Git access via [ssh](https://help.github.com/en/articles/connecting-to-github-with-ssh)

## Install Docker
Choose your Operating System platform and download from https://docs.docker.com/install/#supported-platforms
Configure any extra parameters like [docker-machine env](https://docs.docker.com/docker-for-mac/docker-toolbox/#setting-up-to-run-docker-desktop-for-mac) for docker toolbox users on mac or [linux options](https://docs.docker.com/install/linux/linux-postinstall/)

## Install GIT
```bash
sudo apt install git
```

## Install Docker
```bash
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
sudo apt install docker-ce
```
Based on this link: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04


## Install Docker Compose
```bash
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
sudo usermod -a -G docker $USER
newgrp docker
```

Based on this link: https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-18-04


## Install Booking-sys Apps
### Clone the repo and change file mode bits

```bash
git@github.com:waelwalid/booking-sys.git
cd -
./install.sh
```

### Xtra command available on install.sh
```bash

# This commend will install required dependencies
./install install_dependencies

# Update /etc/hosts update_hosts
./install.sh update_hosts

# This commend will build all necessary applications
./install.sh build

# This commend will create all databases in mysql_database container
./install.sh create_databases


```

/etc/hosts will look like this:

```bash

172.32.0.2 mysqldb.local
172.32.0.4 booking.local
... any other hosts will go here automatically

```

### Up Containers

To put up specific containters
```bash
docker-compose up -d booking ...<container_name> <container_name> 
```

To put up All containters
```bash
docker-compose up -d
```

Import Postman Collection
https://documenter.getpostman.com/view/21015452/2s8YmULKw8

### IPs range

172.32.0.100-120 Core Apps

	172.32.0.2 mysqldb.local
	172.32.0.4 booking.local


172.32.0.121-150 Adapters (Integrations Microservices)

      TO BE READY 


172.32.0.151-253 All other supporting services

      172.32.0.200       notifications.local
      172.32.0.201       redis.local


## Check Applications
    172.32.0.2 mysqldb.local
	172.32.0.4 booking.local
| IP | Service | Url |
| ------------- | ------------- | -------------       |
| 172.32.0.110-120 | ------------- | Core Apps          |
|  172.32.0.110 | Database |  mysqldb.local:3306           |
| 172.32.0.121-150 | ------------- | Adapters               |
| 172.32.0.151-253  | ------------- | supporting services                |
|  172.32.0.112 | ex: redis | <http://redis.local>          |
|  172.29.0.113 | ex: notifications | <https://notifications.local>              |




## TODO
- [x] Database seeding
- [x] Single script configuration (```./install.sh```)
- [x] Automatic Database Creation
- [x] Automatically write hosts to `/etc/hosts`
- [x] Use Typescript
- [x] use PostgreSQL as database (Mysql)
- [x] Use Express.js to create the APIs 
- [x] Use airbnb eslint rules

[Bonuses]
- [x] Use any logger method or library to have full trace for all APIs request with correlation Id for each request 
- [x] Secure your API with fixed API key or fixed JWT token 
- [x] Create Docker file for the solution

