FROM node:18
    
COPY ./ /src

WORKDIR /src

RUN npm install

CMD [ "node","index.js" ]