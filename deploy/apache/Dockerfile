FROM httpd:2.4.52-alpine
COPY ./httpd.conf /tmp
RUN cat /tmp/httpd.conf >> /usr/local/apache2/conf/httpd.conf && \
    rm /usr/local/apache2/htdocs/index.html
COPY ./build /usr/local/apache2/htdocs
