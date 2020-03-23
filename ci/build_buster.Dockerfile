FROM debian:buster

RUN apt-get update && apt-get -y dist-upgrade && apt-get -y --no-install-recommends install wget gnupg apt-transport-https ca-certificates
RUN wget http://pkg.yeti-switch.org/key.gpg -O - | apt-key add -
RUN wget https://deb.nodesource.com/gpgkey/nodesource.gpg.key -O - | apt-key add -
RUN echo "deb http://pkg.yeti-switch.org/debian/buster unstable main" >> /etc/apt/sources.list 
RUN echo "deb https://deb.nodesource.com/node_10.x buster main" >> /etc/apt/sources.list

RUN apt-get update && apt-get -y --no-install-recommends install build-essential devscripts \
    debhelper fakeroot lintian python-jinja2 \
    git-changelog python-setuptools lsb-release curl \ 
    nodejs

ADD . /build/virtualizm-ui/

WORKDIR /build/virtualizm-ui/
CMD npm install yarn -g && make package

