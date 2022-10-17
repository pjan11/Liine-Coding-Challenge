FROM node:16-alpine
WORKDIR /Liine Coding Challenge
COPY ["package.json", "package-lock.json*", "./"]
COPY . .
CMD ["node", "server.js"]
