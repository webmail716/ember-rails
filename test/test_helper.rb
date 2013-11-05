ENV["RAILS_ENV"] ||= "test"
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require "minitest/spec"

class ActiveSupport::TestCase
  ActiveRecord::Migration.check_pending!

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  #
  # Note: You'll currently still have to declare fixtures explicitly in integration tests
  # -- they do not yet inherit this setting
  fixtures :all

  # Add more helper methods to be used by all tests here...
  # JG - 2013-Oct-21 - code below is described here: http://blowmage.com/2013/07/08/minitest-spec-rails4
	class << self
    remove_method :describe
  end

  extend MiniTest::Spec::DSL

	register_spec_type self do |desc|
    desc < ActiveRecord::Base if desc.is_a? Class
  end  
end
