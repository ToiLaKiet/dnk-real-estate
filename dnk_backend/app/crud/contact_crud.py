from sqlalchemy.orm import Session
from app.models.contact_model import Contact
from app.schemas.contact_schema import ContactCreate, ContactUpdate
from typing import List, Optional


def create_contact(db: Session, contact_in: ContactCreate) -> Contact:
    contact = Contact(**contact_in.model_dump())
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return contact


def get_contact(db: Session, contact_id: int) -> Optional[Contact]:
    return db.query(Contact).filter(Contact.contact_id == contact_id).first()


def get_contacts_by_property_id(db: Session, property_id: int) -> List[Contact]:
    return db.query(Contact).filter(Contact.property_id == property_id).all()


def update_contact(db: Session, contact_id: int, contact_in: ContactUpdate) -> Optional[Contact]:
    contact = db.query(Contact).filter(Contact.contact_id == contact_id).first()
    if not contact:
        return None
    for field, value in contact_in.model_dump(exclude_unset=True).items():
        setattr(contact, field, value)
    db.commit()
    db.refresh(contact)
    return contact


def delete_contact(db: Session, contact_id: int) -> bool:
    contact = db.query(Contact).filter(Contact.contact_id == contact_id).first()
    if not contact:
        return False
    db.delete(contact)
    db.commit()
    return True
