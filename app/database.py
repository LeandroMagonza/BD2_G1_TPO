from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pymongo import MongoClient
import redis

SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgres/tienda_online"
MONGO_DATABASE_URL = "mongodb://mongo:27017"
REDIS_DATABASE_URL = "redis://redis:6379"

# PostgreSQL
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# MongoDB
mongo_client = MongoClient(MONGO_DATABASE_URL)
mongo_db = mongo_client["tienda_online"]

# Redis
redis_client = redis.Redis.from_url(REDIS_DATABASE_URL)
