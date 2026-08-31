FROM nginx:alpine AS portal

# Copy the nginx configuration file
COPY /nginx-server.conf /etc/nginx/conf.d/default.conf

# Copy all files from the pages directory to the nginx html directory
COPY ./pages /usr/share/nginx/html

ARG VERSION=DEV
RUN echo "console.log('audiowalk.cz portal ${VERSION}');" > /usr/share/nginx/html/version.js
