FROM node:18.0.0-alpine3.14
RUN npm i -g npm@8.10.0

RUN addgroup --gid 990 template
RUN adduser template --home /home/template --uid 990 --system -G template

USER template

RUN mkdir /home/template/server
WORKDIR /home/template/server
COPY --chown=template ./package*.json ./
COPY ./prisma prisma

RUN npm install

COPY --chown=template . .

EXPOSE 3000

CMD [ "npm", "run", "ci:start" ]