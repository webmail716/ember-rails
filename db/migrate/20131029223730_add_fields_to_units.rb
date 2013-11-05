class AddFieldsToUnits < ActiveRecord::Migration
  def change
    add_column :units, :unit_type, :string
    add_column :units, :sqft, :integer
    add_column :units, :description, :string
    add_column :units, :lon, :float
    add_column :units, :lat, :float
    add_column :units, :searchable, :boolean
    add_column :units, :for_sale, :boolean
    add_column :units, :for_rent, :boolean
    add_column :units, :amenity_list, :string
  end
end
