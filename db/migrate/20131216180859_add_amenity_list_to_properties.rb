class AddAmenityListToProperties < ActiveRecord::Migration
  def change
    add_column :properties, :amenity_list, :text
  end
end
