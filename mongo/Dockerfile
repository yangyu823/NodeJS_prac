FROM mongo

COPY data.json /data.json
CMD mongoimport --host mongo --db motorcycle --collection superbike --type json --file /data.json --jsonArray
