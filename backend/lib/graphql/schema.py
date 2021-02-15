import graphene
from backend.db import db_session
from graphene import ObjectType, String, Schema, Mutation
from graphene_sqlalchemy import SQLAlchemyObjectType
from models.user_model import UserModel
from models.vendor_model import VendorModel

class User(SQLAlchemyObjectType):
  class Meta:
    model = UserModel

class Vendor(SQLAlchemyObjectType):
  class Meta:
    model = VendorModel

class Query(ObjectType):
  users = graphene.List(User)
  user = graphene.Field(User, id=graphene.Int())

  vendors = graphene.List(Vendor)
  vendor = graphene.Field(Vendor, id=graphene.Int())

  filter_vendor_status = graphene.List(Vendor, status=graphene.Int())
  filter_vendor_risk = graphene.List(Vendor, risk=graphene.String())
  filter_vendor_category = graphene.List(Vendor, category=graphene.String())

  def resolve_users(root, info):
    query = User.get_query(info)  # SQLAlchemy query
    return query.all()

  def resolve_user(root, info, id):
    query = User.get_query(info)
    return query.filter(UserModel.id == id).first()
  
  def resolve_vendors(root, info):
    query = Vendor.get_query(info)  # SQLAlchemy query
    return query.all()
  
  def resolve_vendor(root, info, id):
    query = Vendor.get_query(info)
    return query.filter(VendorModel.id == id).first()

  def resolve_filter_vendor_status(root, info, status):
    query = Vendor.get_query(info)
    return query.filter(VendorModel.status == status).all()
  
  def resolve_filter_vendor_risk(root, info, risk):
    query = Vendor.get_query(info)
    return query.filter(VendorModel.risk == risk).all()
  
  def resolve_filter_vendor_category(root,info, category):
    query = Vendor.get_query(info)
    return query.filter(VendorModel.category == category).all()

class UpdateVendor(Mutation):
  class Arguments:
    id = graphene.Int()
    category = graphene.String()
    status = graphene.Int()
  
  vendor = graphene.Field(Vendor, id=graphene.Int())
  
  ok = graphene.Boolean()
  def mutate(root, info, id, category, status):
    query = Vendor.get_query(info)
    vendor =  db_session.query(VendorModel).filter_by(id=id).first()
    setattr(vendor,"category", category)
    setattr(vendor, "status", status)
    db_session.commit()
    ok=True
    Output = Vendor
    return UpdateVendor(vendor=vendor, ok=ok)

class MyMutations(ObjectType):
    update_vendor = UpdateVendor.Field()

schema = Schema(query=Query, mutation=MyMutations)
