class CreateUnits < ActiveRecord::Migration
  def change
    create_table :units do |t|
      t.references :property, index: true
      t.string :unit_number
      t.string :bathrooms
      t.string :bedrooms

      t.timestamps
    end
  end
end
