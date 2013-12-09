class ContactRequestSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :message, :contact_method
end
