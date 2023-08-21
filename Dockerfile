FROM node:19.8-alpine
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./index.js ./
COPY ./data ./
CMD ["npm", "start"]