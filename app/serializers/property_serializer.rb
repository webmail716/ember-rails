class PropertySerializer < ActiveModel::Serializer
  attributes :id, :neighborhood, :name, :street, :city, :state, :zip

  has_many :units
  embed :ids, include: false
  
end



