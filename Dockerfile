FROM golang:1.3-onbuild

COPY . /usr/src/app
RUN go get -d -v
RUN go install -v


RUN curl -s https://bootstrap.pypa.io/get-pip.py | python

RUN pip install --upgrade youtube-dl



