class AddUnitIdToImages < ActiveRecord::Migration
  def change
  	add_column :images, :unit_id, :integer
  end
end
