FROM hypriot/rpi-node

WORKDIR /zhihu-daily-reader

ADD ./package.json /zhihu-daily-reader
RUN npm install --production

ADD . /zhihu-daily-reader

VOLUME /zhihu-daily-reader

EXPOSE 8888

CMD ["npm", "start"]
