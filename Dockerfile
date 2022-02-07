# declare base image
FROM node:17

# set working directory
WORKDIR /app

# set the environment variable
ENV NODE_ENV production

# copy package.json file
COPY package*.json ./

# Install node library
RUN npm install

# copy all source files
COPY . .

# install PM2 library
RUN npm install -g pm2

# expose the port
EXPOSE 3000

# run application
CMD ["pm2-runtime", "index.js"]