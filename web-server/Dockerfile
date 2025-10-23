FROM nginx:stable-alpine
# Simple web proxy that forwards requests to the actual finalexam.narongsak.site
# We'll use nginx to reverse-proxy to the user's real backend.
RUN apk add --no-cache curl
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
