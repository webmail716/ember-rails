class Unit < ActiveRecord::Base
  belongs_to :property
  belongs_to :contact

  validates :unit_number, presence: true
end
