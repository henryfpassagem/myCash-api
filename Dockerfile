FROM node:16

EXPOSE 3001

WORKDIR /app

# Here we copy package.json and package-lock.json to the container
# and ensure the versions of the dependencies.
COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]