class Unit < ActiveRecord::Base
  belongs_to :property
  belongs_to :contact

  has_many :images
  
  has_attached_file :ebrochure
  has_attached_file :apply_now
  
  validates :unit_number, presence: true
end
