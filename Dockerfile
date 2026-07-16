# Use a lightweight nginx image based on Alpine Linux
FROM nginx:alpine


# Remove the default nginx website
# This prevents nginx from showing its default page
RUN rm -rf /usr/share/nginx/html/*


# Copy the static website files
# nginx serves files from this directory
COPY . /usr/share/nginx/html/


# Expose nginx default HTTP port
EXPOSE 80


# Start nginx in foreground mode
# Required for Docker containers
CMD ["nginx", "-g", "daemon off;"]