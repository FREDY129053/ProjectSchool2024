FROM node:18-alpine
WORKDIR /frontend
COPY package.json .
RUN npm install 
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# по архитектуре, которая была предложена, этот файлик должен находиться в папке config,
# но это не получилось реализовать, т.к. докер (насколько я разобрался) не позволяет
# обращаться к директориям и файлам, находящимся выше него самого