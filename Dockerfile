ARG FROM=justforfunclick/ubuntu:latest

FROM $FROM

COPY package-lock.json /app/
COPY package.json /app/
COPY src/. /app/

RUN cd /app && npm install

RUN if [ -f /etc/ssl/certs/justforfun.click.fullchain.pem ]; then ln -s /etc/ssl/certs/justforfun.click.fullchain.pem /app/public.key; fi
RUN if [ -f /etc/ssl/private/justforfun.click.privkey.pem ]; then ln -s /etc/ssl/private/justforfun.click.privkey.pem /app/private.key; fi

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["node", "app/index.js"]
