class ImageSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :unit_id, :image
end
