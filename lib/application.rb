require_relative '../config/environment'

module Rack
  class Lotus
    helpers do
      def addon_enabled?(addon)
        @blade ||= Propeller::Blade.new
        @blade.addon_enabled? addon
      end

      def user_option_for(key)
        @blade ||= Propeller::Blade.new
        @blade.user_option_for(key)
      end
    end
  end
end

class Application < Sinatra::Base
  # Use root directory as root
  set :app_file => '.'

  # Use HTML5
  set :haml, :format => :html5

  # Helpers
  helpers Sinatra::ContentFor
  helpers Rack::Lotus::AuthorizationHelpers

  def self.load_tasks
    Dir[File.join(File.dirname(__FILE__), "tasks", '*.rb')].each do |file|
      require file
    end
  end

  helpers do
    def partial_exists?(page)
      File.exists?("./views/#{partial_to_page(page)}.haml")
    end

    def partial_to_page(page)
      if page.to_s.include? "/"
        page = page.to_s.sub /[\/]([^\/]+)$/, "/_\\1"
      else
        page = "_#{page}"
      end
    end

    def partial(page, options={})
      haml partial_to_page(page).to_sym, options.merge!(:layout => false)
    end

    def addon_enabled?(addon)
      @blade ||= Propeller::Blade.new
      @blade.addon_enabled? addon
    end

    def user_option_for(key)
      @blade ||= Propeller::Blade.new
      @blade.user_option_for(key)
    end
  end

  get '/' do
    haml :"home/index"
  end

  get '/styleguide' do
    haml :"styleguide"
  end
end

%w(config helpers controllers models).each do |dir|
    Dir[File.join(File.dirname(__FILE__), "../#{dir}", '*.rb')].each {|file| require file }
end
