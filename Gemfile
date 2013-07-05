source 'https://rubygems.org'

gem 'sinatra', '~> 1.4.2'
gem 'sinatra-contrib'

gem 'bson_ext'
gem 'mongo_mapper'

gem "redfinger", :git => "git://github.com/hotsh/redfinger.git"
gem 'lotus', :git => 'git://github.com/hotsh/lotus.git'
gem 'lotus-i18n', :git => 'git://github.com/hotsh/lotus-i18n.git'
gem 'lotus-mongodb', :git => 'git://github.com/hotsh/lotus-mongodb.git'
gem 'rack-lotus', :git => 'git://github.com/hotsh/rack-lotus.git'

group :development do
  gem 'debugger'
  gem 'perftools.rb'
  gem 'ruby-prof'
end

group :test do
  gem 'capybara', '~> 1.1.2', :require => 'capybara/dsl'
  gem 'fabrication', '~> 1.2.0'
  gem 'database_cleaner', '~> 0.6.7'
  gem 'rack-test', '~> 0.6.1', :require => 'rack/test'
  gem 'minitest', '~> 2.12.1', :require => 'minitest/autorun'
end

gem 'thin'
