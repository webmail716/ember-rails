require 'test_helper'
# require 'mocha'

class UnitsControllerTest < ActionController::TestCase
	# MiniTest::TestCase.add_setup_hook { ApplicationController.expects(:current__user).returns(FactoryGirl.create :user) }

	test "index should return all units" do
		6.times do
			FactoryGirl.create :unit
		end

		get 'index'
		results = JSON.parse(response.body)
		assert_equal 6, results['units'].size
	end

	def login
		@api_key = FactoryGirl.create :api_key
		@request.headers["HTTP_AUTHORIZATION"] = @api_key.access_token
		@user = FactoryGirl.create :user
		@api_key.user = @user
		@api_key.save!
	end

	test "show" do
		unit = FactoryGirl.create :unit

		login

		get 'show', :id => unit.id
		assert_response :success
		results = JSON.parse(response.body)
		assert_not_nil results['unit']
	end

	test "create" do
		# prop = FactoryGirl.create :property

		login

		post 'create', {
			unit: {
				unit_number: '204A',
				bedrooms: 2,
				bathrooms: 1, 
				# property_id: prop.id,
				neighborhood: "NNN",
				price: 2500,
				unit_type: "Commercial",
				sqft: 800,
				description: "Crummy slum",
				lon: 12,
				lat: 55,
				searchable: true,
				for_sale: true, 
				for_rent: true,
				amenity_list: "Pool, Laundry"
			}
		}

		results = JSON.parse(response.body)
		results['unit']['bedrooms'].must_equal 2
		results['unit']['bathrooms'].must_equal 1
		results['unit']['unit_number'].must_equal "204A"
		# results['unit']['property_id'].must_equal prop.id
		results['unit']['neighborhood'].must_equal "NNN"
		results['unit']['price'].to_i.must_equal 2500
		results['unit']['unit_type'].must_equal "Commercial"
		results['unit']['sqft'].to_i.must_equal 800
		results['unit']['description'].must_equal "Crummy slum"
		results['unit']['lon'].to_i.must_equal 12
		results['unit']['lat'].to_i.must_equal 55
		results['unit']['searchable'].must_equal true
		results['unit']['for_sale'].must_equal true
		results['unit']['for_rent'].must_equal true
		results['unit']['amenity_list'].must_equal "Pool, Laundry"
	end

	test "search_by_bedroom_range" do
		FactoryGirl.create :unit, { :bedrooms => 2 }
		FactoryGirl.create :unit, { :bedrooms => 4 }

		Unit.all.size.must_equal 2

		get 'index', { min_bedrooms: 1, max_bedrooms: 3 }

		#should return a list of units that have one or 2 bedrooms, but nothing else
		results = JSON.parse(response.body)

		units = results['units']
		units.size.must_equal 1

		units.each do |unit|
			# unit = json['unit']
			bedrooms = unit['bedrooms'].to_i
			assert (bedrooms >= 1 && bedrooms <= 3), "Bedrooms (val=#{bedrooms}) is not within search criteria range (1-3)"
		end
	end

	test "search by bedroom exact number" do
		FactoryGirl.create :unit, { bedrooms: 4 }
		FactoryGirl.create :unit, { bedrooms: 2 }
		FactoryGirl.create :unit, { bedrooms: 3 }

		Unit.all.size.must_equal 3

		get 'index', { min_bedrooms: 4, max_bedrooms: 4 }

		#should return a list of units that have one or 2 bedrooms, but nothing else
		results = JSON.parse(response.body)

		units = results['units']
		units.size.must_equal 1

		units.each do |unit|
			# unit = json['unit']
			bedrooms = unit['bedrooms'].to_i
			bedrooms.must_equal 4, "Bedrooms is not the value expected"
		end		
	end

	test "search by bathroom exact number" do
		FactoryGirl.create :unit, { bathrooms: 1 }
		FactoryGirl.create :unit, { bathrooms: 2 }

		Unit.all.size.must_equal 2

		get 'index', { min_bathrooms: 1, max_bathrooms: 1 }

		#should return a list of units that have one or 2 bedrooms, but nothing else
		results = JSON.parse(response.body)

		units = results['units']
		units.size.must_equal 1

		units.each do |unit|
			# unit = json['unit']
			bathrooms = unit['bathrooms'].to_i
			bathrooms.must_equal 1, "Bathrooms is not the value expected"
		end		
	end

	test "search by bedroom and bathroom exact number" do
		FactoryGirl.create :unit, { bedrooms: 2, bathrooms: 1 }
		FactoryGirl.create :unit, { bedrooms: 2, bathrooms: 2 }
		FactoryGirl.create :unit, { bedrooms: 3, bathrooms: 1 }

		Unit.all.size.must_equal 3

		get 'index', { min_bedrooms: 2, max_bedrooms: 2, min_bathrooms: 1, max_bathrooms: 1 }

		#should return a list of units that have one or 2 bedrooms, but nothing else
		results = JSON.parse(response.body)

		units = results['units']
		units.size.must_equal 1

		units.each do |unit|
			# unit = json['unit']
			bedrooms = unit['bedrooms'].to_i
			bedrooms.must_equal 2, "Bedrooms is not the value expected"

			bathrooms = unit['bathrooms'].to_i
			bathrooms.must_equal 1, "Bathrooms is not the value expected"
		end
	end

	test "search by price range" do
		FactoryGirl.create :unit, { price: 2200 }
		FactoryGirl.create :unit, { price: 3200 }
		FactoryGirl.create :unit, { price: 22000 }
		FactoryGirl.create :unit, { price: 200 }

		Unit.all.size.must_equal 4

		get 'index', { min_price: 2000, max_price: 4000 }

		#should return a list of units that have one or 2 bedrooms, but nothing else
		results = JSON.parse(response.body)

		units = results['units']
		units.size.must_equal 2

		units.each do |unit|
			# unit = json['unit']
			price = unit['price'].to_i
			assert (price >= 2000 && price <= 4000), "Price is not in the range expected"
		end		
	end

	test "search by neighborhood 1" do
		FactoryGirl.create :unit, { neighborhood: "Chula Vista" }
		FactoryGirl.create :unit, { neighborhood: "Sesame Street" }
		FactoryGirl.create :unit, { neighborhood: "The hood" }

		Unit.all.size.must_equal 3

		get 'index', { neighborhood: "Chula Vista" }

		#should return a list of units that have one or 2 bedrooms, but nothing else
		results = JSON.parse(response.body)

		units = results['units']
		units.size.must_equal 1

		units.each do |unit|
			# unit = json['unit']
			neighborhood = unit['neighborhood']
			neighborhood.must_equal "Chula Vista", "Neighborhood is not the expected value"
		end		
	end

	test "search by neighborhood 2" do
		FactoryGirl.create :unit, { neighborhood: "Banker's Hill" }
		FactoryGirl.create :unit, { neighborhood: "Sesame Street" }
		FactoryGirl.create :unit, { neighborhood: "The hood" }

		Unit.all.size.must_equal 3
		
		get 'index', { neighborhood: "Banker's Hill" }

		#should return a list of units that have one or 2 bedrooms, but nothing else
		results = JSON.parse(response.body)

		units = results['units']
		units.size.must_equal 1

		units.each do |unit|
			# unit = json['unit']
			neighborhood = unit['neighborhood']
			neighborhood.must_equal "Banker's Hill", "Neighborhood is not the expected value"
		end		
	end

	test "search doesnt return units marked as not searchable" do
		login
		
		9.times do 
			FactoryGirl.create :unit
		end

		2.times do
			FactoryGirl.create :non_searchable_unit
		end

		# Unit.all.size.must_equal 5

		get 'index', { min_price: 0, max_price: 99999999 }

		results = JSON.parse(response.body)

		units = results['units']
		units.size.must_equal 9
	end

	test "search by for sale" do
		login

		FactoryGirl.create :unit, { for_sale: true, for_rent: false }
		FactoryGirl.create :unit, { for_sale: false, for_rent: false }

		Unit.all.size.must_equal 2

		get 'index', { for_sale: true }

		results = JSON.parse(response.body)

		units = results['units']
		units.size.must_equal 1
	end

	test "search by for rent" do
		FactoryGirl.create :unit, { for_sale: false, for_rent: true }
		FactoryGirl.create :unit, { for_sale: false, for_rent: false }

		Unit.all.size.must_equal 2

		get 'index', { for_rent: true }

		results = JSON.parse(response.body)

		units = results['units']
		units.size.must_equal 1
	end

	test "search by for sale (bool as string)" do
		FactoryGirl.create :unit, { for_sale: true, for_rent: false }
		FactoryGirl.create :unit, { for_sale: false, for_rent: false }

		Unit.all.size.must_equal 2

		get 'index', { for_sale: "true" }

		results = JSON.parse(response.body)

		units = results['units']
		units.size.must_equal 1
	end

	test "search by for rent (bool as string)" do
		FactoryGirl.create :unit, { for_sale: false, for_rent: true }
		FactoryGirl.create :unit, { for_sale: false, for_rent: false }

		Unit.all.size.must_equal 2

		get 'index', { for_rent: "true" }

		results = JSON.parse(response.body)

		units = results['units']
		units.size.must_equal 1
	end

	# test "search by neighborhood multiple" do
	# 	post 'search', {
	# 		query: {
	# 			unit: {
	# 				neighborhood: ["Chula Vista", "La Jolla"]
	# 			}
	# 		}
	# 	}

	# 	#should return a list of units that have one or 2 bedrooms, but nothing else
	# 	results = JSON.parse(response.body)

	# 	results.size.must_equal 2
	# 	results.each do |unit|
	# 		# unit = json['unit']
	# 		neighborhood = unit['neighborhood']
	# 		assert ["Chula Vista", "La Jolla"].include?(neighborhood), "Neighborhood is not the expected value"
	# 	end		
	# end

end
