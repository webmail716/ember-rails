class AddFloorplanToImage < ActiveRecord::Migration
  def change
    add_column :images, :is_floorplan, :boolean
  end
end
