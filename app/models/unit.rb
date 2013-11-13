class Unit < ActiveRecord::Base
  belongs_to :property
  belongs_to :contact

  has_many :images
  
  validates :unit_number, presence: true
end
