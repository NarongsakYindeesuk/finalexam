# WAF Nginx with ModSecurity + OWASP CRS (template)
FROM debian:12-slim

# This Dockerfile is written as a best-effort template.
# It will clone and build ModSecurity and the nginx connector during docker build (requires internet).
# If your environment restricts outbound connections, instead prebuild an image and use it here.
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential git ca-certificates wget curl libpcre3-dev libxml2-dev libyajl-dev \
    libtool automake autoconf pkgconf cmake gcc g++ make libssl-dev \
    nginx procps && \
    rm -rf /var/lib/apt/lists/*

# Clone ModSecurity v3 and ModSecurity-nginx connector and build (may take a while)
WORKDIR /opt
RUN git clone --depth 1 https://github.com/SpiderLabs/ModSecurity --branch v3/master modsecurity && \
    git clone --depth 1 https://github.com/SpiderLabs/ModSecurity-nginx nginx-modsecurity || true

# NOTE: Building ModSecurity and the connector requires many steps and libraries.
# For teaching and testing, you may prefer to use a prebuilt image (e.g., owasp/modsecurity-crs images) or adapt this Dockerfile
# The rest of this Dockerfile configures nginx, ModSecurity, and OWASP CRS placement.

# Create directories for config and rules
RUN mkdir -p /etc/modsecurity /etc/nginx/modsec

# Copy template config (we'll add conf files at build-context)
COPY modsecurity.conf /etc/modsecurity/modsecurity.conf
COPY nginx-waf.conf /etc/nginx/conf.d/default.conf
COPY crs/ /etc/nginx/modsec/crs/

# Expose and run nginx
EXPOSE 80
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
