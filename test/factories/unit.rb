FactoryGirl.define do
	factory :unit do
		unit_number 666
		searchable true
		price 100
		bedrooms 1
		bathrooms 1
		neighborhood "La Jolla"
		for_sale false
		for_rent false
	end

	factory :non_searchable_unit, :parent => :unit do
		searchable false
	end
end
