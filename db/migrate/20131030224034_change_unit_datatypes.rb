class ChangeUnitDatatypes < ActiveRecord::Migration
  def change
  	remove_column :units, :bedrooms
  	remove_column :units, :bathrooms

  	add_column :units, :bedrooms, :integer
  	add_column :units, :bathrooms, :integer
  end
end
