# Mini-Microservices-App
Mini-Microservices com Arquitetura Assincronia com event bus (query service, emmiting events e receiving events). Stack: React.js Node.js com Express.
  
## Docker quick notes  
   
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
docker push havyx/posts

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
  
## Kubernetes quick notes  
  
* Kubernetes CLuster: A collections of nodes + a master to manage them  
* Node: A virtual machine that will run our containers  
* Pode : More or less a running container. A Pod can run multiple containers.
* Deployment: Monitors a set of pods, make sure they are running and restarts them if they crash.
* Provides an easy-to-remember URL to access a running container.  
  
```
kubectl version
docker build -t havyx/posts:0.0.1 .
```
  
* Criar um pod com a .yaml file:  
```
apiVersion: v1
kind: Pod
metadata:
  name: posts
spec:
  containers:
    - name: posts
      image: havyx/posts:0.0.1
```
```
kubectl apply -f posts.yaml
kubectl exec -it posts sh
  
Others commands:
kubectl get pods
kubectl exec -it [pod_name] [cmd]
kubectl logs [pod_name]
kubectl delete pod [pod_name]
kubectl apply -f [config file name]
kubectl describe pod [pod_name]
```
  
# Deployment  
```
kubectl get deplyments
kubectl describe deployment [depl name]
kubectl apply -f [config file name]
kubectl delete deployment [depl_name]
kubectl rollout restart deployment posts-depl
```
