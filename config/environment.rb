require 'bundler'
Bundler.require

require_relative './application'

class Application < Sinatra::Base
  configure :test do
    MongoMapper.database = "nelumba-test"
  end

  configure :development do
    MongoMapper.database = "nelumba-0"
  end
end
