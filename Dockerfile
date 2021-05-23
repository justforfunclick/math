FROM ubuntu:20.04

RUN ln -s /usr/share/zoneinfo/US/Pacific /etc/localtime && echo US/Pacific > /etc/timezone && \
    apt update && \
    apt install -y npm

RUN npm install browserify -g

COPY package-lock.json /app/
COPY package.json /app/
COPY src /app/src

RUN cd /app && npm install && npm run build

EXPOSE 80

ENTRYPOINT ["node", "app/src/index.js"]