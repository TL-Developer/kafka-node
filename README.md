NodeJS with Kafka, zookeeper and kafka drop

docker exec kafka-node-kafka-1 kafka-topics --create --bootstrap-server localhost:29092 --partitions 1 --replication-factor 1 --topic Test