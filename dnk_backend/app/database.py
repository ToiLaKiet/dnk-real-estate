from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


DATABASE_URL = 'postgresql://postgres:password2025@localhost:5432/dnk_real_estate'

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set in .env file")

# Tạo engine
engine = create_engine(DATABASE_URL)

# Tạo session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Tạo lớp cơ sở để khai báo các bảng (model)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
