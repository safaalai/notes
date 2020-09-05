# STAGE 1: INSTALL ALL DEPENDENCIES
# Base image from hub.docker.com
FROM node:alpine AS stage1
 
# app directory to hold app specific files
WORKDIR /app
 
# app install dependencies
COPY ./package*.json ./
ENV NODE_ENV production
RUN npm install
 
# Copy compiled files
COPY ./dist ./dist

# STAGE 2: COPY FILES TO DISTROLESS
FROM gcr.io/distroless/nodejs
ENV NODE_ENV production
WORKDIR /app
COPY --from=stage1 /app /app
 
# Startup command
CMD [ "./dist/index.js" ]
