FROM hypriot/rpi-node:latest

WORKDIR /zhihu-daily-reader

COPY . /zhihu-daily-reader

RUN npm config set registry "https://registry.npm.taobao.org/" \
    && npm install --production \
    && npm config delete registry

VOLUME /zhihu-daily-reader

EXPOSE 8888

CMD ["npm", "start"]
