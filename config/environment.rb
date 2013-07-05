require 'bundler'
Bundler.require

require_relative './application'

class Application < Sinatra::Base
  configure :test do
    MongoMapper.database = "openreader_test"
  end

  configure :development do
    MongoMapper.database = "openreader_development"
  end
end
