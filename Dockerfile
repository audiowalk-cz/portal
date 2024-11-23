FROM nginx:alpine

# Copy the nginx configuration file
COPY /nginx-server.conf /etc/nginx/conf.d/default.conf

# Copy all files from the pages directory to the nginx html directory
COPY ./pages /usr/share/nginx/html
