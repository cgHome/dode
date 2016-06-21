FROM <baseImage>

MAINTAINER <name>

# Install app dependencies
ADD package.json .
RUN npm install

# Bundle app source
ADD . .