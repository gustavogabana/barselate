# Use a lightweight nginx image based on Alpine Linux
FROM nginx:alpine


# Remove the default nginx website
RUN rm -rf /usr/share/nginx/html/*


# Copy frontend source files
COPY src/ /usr/share/nginx/html/


# Copy static assets
COPY assets/ /usr/share/nginx/html/assets/


# Expose nginx default HTTP port
EXPOSE 80


# Start nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]