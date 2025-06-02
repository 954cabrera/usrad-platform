FROM node:18.20.8

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 4321

CMD ["npm", "run", "start"]
