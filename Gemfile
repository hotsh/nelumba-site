source 'https://rubygems.org'

ruby '2.0.0'

gem 'sinatra'
gem 'sinatra-contrib'

gem 'propeller', :git => "git://github.com/wilkie/propeller.git"

gem 'bson_ext'
gem 'mongo_mapper'

gem 'sass'
gem 'compass'

gem "redfinger", :git => "git://github.com/hotsh/redfinger.git"
gem 'nelumba', :git => 'git://github.com/hotsh/nelumba.git'
gem 'nelumba-i18n', :git => 'git://github.com/hotsh/nelumba-i18n.git'
gem 'nelumba-mongodb', :git => 'git://github.com/hotsh/nelumba-mongodb.git'
gem 'rack-nelumba', :git => 'git://github.com/hotsh/rack-nelumba.git'

group :development do
  #gem 'debugger'
  #gem 'perftools.rb'
  #gem 'ruby-prof'
end

group :test do
  gem 'capybara', '~> 1.1.2', :require => 'capybara/dsl'
  gem 'fabrication', '~> 1.2.0'
  gem 'database_cleaner', '~> 0.6.7'
  gem 'rack-test', '~> 0.6.1', :require => 'rack/test'
  gem 'minitest', '~> 2.12.1', :require => 'minitest/autorun'
end

gem 'thin'
