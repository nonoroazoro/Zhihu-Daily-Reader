FROM hypriot/rpi-node:latest

WORKDIR /zhihu-daily-reader

ENV NODE_ENV production

COPY ./package.json /zhihu-daily-reader/
RUN npm install --production

COPY . /zhihu-daily-reader/

EXPOSE 8888

CMD ["npm", "start"]
