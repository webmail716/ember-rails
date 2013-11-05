require 'test_helper'

describe Unit do

	let(:valid_params) { { unit_number: "204B", bedrooms: 3, bathrooms: 2, neighborhood: "Bankers Hill", price: 2400 } }
	let(:unit) { Unit.new valid_params }

	it "is valid with valid params" do
		unit.must_be :valid?
		assert unit.valid?, "Can't create with valid params: #{unit.errors.messages}"
	end

	it "is invalid without a unit number" do
		valid_params.delete :unit_number

		unit.wont_be :valid?
		unit.errors[:unit_number].must_be :present? #"Missing error when without unit number"
	end
end