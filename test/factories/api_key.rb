FactoryGirl.define do
	factory :api_key do
		access_token "token"
		scope 'session'
	end
end