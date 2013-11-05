class AddContactIdToUnits < ActiveRecord::Migration
  def change
    add_column :units, :contact_id, :integer
  end
end
