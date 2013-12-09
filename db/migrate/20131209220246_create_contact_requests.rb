class CreateContactRequests < ActiveRecord::Migration
  def change
    create_table :contact_requests do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.text :message
      t.string :contact_method

      t.timestamps
    end
  end
end
