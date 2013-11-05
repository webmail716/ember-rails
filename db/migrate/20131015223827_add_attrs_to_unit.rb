class AddAttrsToUnit < ActiveRecord::Migration
  def change
    add_column :units, :neighborhood, :string
    add_column :units, :price, :decimal
  end
end
