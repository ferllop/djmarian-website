FROM node:16.14.2-alpine
RUN npm i -g @11ty/eleventy

WORKDIR /website
ENTRYPOINT ["eleventy", "--input=/website_source", "--output=/website_build"]
