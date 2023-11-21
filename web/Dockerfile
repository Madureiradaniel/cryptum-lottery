FROM node:16-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

COPY ./ /web


WORKDIR /web
# install and cache app dependencies
RUN yarn install

RUN yarn build

# start app
CMD ["yarn", "preview"]
