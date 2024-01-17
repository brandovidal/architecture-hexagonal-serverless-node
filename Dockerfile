FROM mongo:4.4.26

# save data in local folder
VOLUME /data/db /data/configdb

# expose port
EXPOSE 27017

