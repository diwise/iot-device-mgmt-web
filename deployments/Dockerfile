FROM --platform=$BUILDPLATFORM registry.access.redhat.com/ubi8/nodejs-16 AS builder

# Copy package json and install dependencies
COPY ./diwiseweb/package.json .
RUN npm install

# Copy app resources and build the static files
COPY ./diwiseweb/public public
COPY ./diwiseweb/src src
RUN npm run build

FROM registry.access.redhat.com/ubi8/nginx-120 AS runner

# Copy nginx conf and the app files created by the builder stage
COPY ./deployments/conf/nginx.conf "${NGINX_CONF_PATH}"
RUN mkdir device-management
COPY --from=builder --chown=1001 /opt/app-root/src/build ./device-management

EXPOSE 8080
USER 1001

ENTRYPOINT ["nginx", "-g", "daemon off;"]
