FROM ubuntu:20.04

RUN ln -s /usr/share/zoneinfo/US/Pacific /etc/localtime && echo US/Pacific > /etc/timezone && \
    apt update && \
    apt install -y npm

COPY package-lock.json /app/
COPY package.json /app/
COPY src/. /app/

RUN cd /app && npm install

EXPOSE 80

ENTRYPOINT ["node", "app/index.js"]