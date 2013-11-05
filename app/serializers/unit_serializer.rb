class UnitSerializer < ActiveModel::Serializer
  attributes :id, :unit_number, :bathrooms, :bedrooms, :property_id, :neighborhood, :price,
  :unit_type, :sqft, :description, :lon, :lat, :searchable, :for_sale, :for_rent, :amenity_list
end
