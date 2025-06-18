from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas.contact_schema import ContactCreate, ContactRead, ContactUpdate
from app.crud import contact_crud
from app.database import get_db

router = APIRouter(prefix="/contacts", tags=["Contacts"])


@router.post("/", response_model=ContactRead, status_code=status.HTTP_201_CREATED)
def create_contact(contact_in: ContactCreate, db: Session = Depends(get_db)):
    return contact_crud.create_contact(db, contact_in)


@router.get("/{contact_id}", response_model=ContactRead)
def get_contact(contact_id: int, db: Session = Depends(get_db)):
    contact = contact_crud.get_contact(db, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact


@router.get("/{property_id}", response_model=List[ContactRead])
def get_contacts_by_property_id(property_id: int, db: Session = Depends(get_db)):
    return contact_crud.get_contacts_by_property_id(db, property_id)


@router.put("/{contact_id}", response_model=ContactRead)
def update_contact(contact_id: int, contact_in: ContactUpdate, db: Session = Depends(get_db)):
    contact = contact_crud.update_contact(db, contact_id, contact_in)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact


@router.delete("/{contact_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_contact(contact_id: int, db: Session = Depends(get_db)):
    success = contact_crud.delete_contact(db, contact_id)
    if not success:
        raise HTTPException(status_code=404, detail="Contact not found")
    return None
