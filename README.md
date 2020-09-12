# Mini-Microservices-App
Mini-Microservices com Arquitetura Assincronia com event bus (query service, emmiting events e receiving events). Stack: React.js Node.js com Express.
  
### Docker quick notes  
   
* alpine: small and compact as much as possible.  
* docker run = docker create my-app-image + docker start -a <containerID>   
* -a : attach on terminal ou usar logs caso nao use o -a  
    
```
docker run my-app-image
docker ps --all  
docker stop <containerID> //stop giving some time   
docker kill <containerID> //RIGHT NOW!  
docker system prune  
docker start <containerID> // sem -a.. usar log  
docker logs <containerID>

```
* Abrir novo terminal, docker ps, pegar id  
* -it para conseguir dar inpur no container  
```
docker run redis
docker exec -it <containerID> redis-cli
```  
  
* open shell inside container sh, bash etc  
```
docker exec -it <containerID> sh  
ls redis-cli etc    
docker run -it container-image-name sh
```
    
* Criar Docker Images  
* mkdir redis-image
* cd redis-image  
* criar arquivo DockerFile  
```
FROM alpine
RUN apk add --update redis
CMD ["redis-server"]
```
```
docker build .  
docker run <containerID>
```  
  
* TAG IMAGE    
```
docker build -t yourDockerId/projectName:version . 
docker build -t havyx/redis:latest . 
docker run havyx/redis  
```  
  
* Nodejs Image  
```
FROM node:alpine 
COPY ./ ./  
RUN npm install  
CMD ["npm", "start"]  
```

* PORT Forwarding  
```
docker run -p portOutsideContainer : portInsideContainer <imageID>  
docker run -p 8080 : 8080 <imageID>
```

* Working directory  
```
FROM node:alpine  
WORKDIR /usr/app  
COPY ./ ./  
RUN npm install  
CMD ["npm", "start"]  
```  
  
* Rebuild BEST WAY Cache  
```
FROM node:alpine  
WORKDIR /usr/app  
COPY ./package.json ./  
RUN npm install  
COPY ./ ./
CMD ["npm", "start"]  
```  
  