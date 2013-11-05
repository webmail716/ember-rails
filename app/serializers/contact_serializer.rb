class ContactSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone
end
