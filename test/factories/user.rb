FactoryGirl.define do 
	sequence :username do |n|
		"username#{n}"
	end

	sequence :name do |n|
		"name#{n}"
	end

	sequence :email do |n|
		"username#{n}@gmail.com"
	end
	
	factory :user do
		username
		password "password"
		password_confirmation "password"
		name 
		email 
	end
end
