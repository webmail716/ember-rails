class AddAttachmentsToUnits < ActiveRecord::Migration
  def self.up
    change_table :units do |t|
      t.attachment :ebrochure
      t.attachment :apply_now
    end
  end

  def self.down
    drop_attached_file :units, :ebrochure
    drop_attached_file :units, :apply_now
  end
end
