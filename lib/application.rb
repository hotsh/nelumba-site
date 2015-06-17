require_relative '../config/environment'

module Rack
  class Nelumba
    helpers do
      def partial_exists?(page)
        ::File.exists?("./views/#{partial_to_page(page)}.haml")
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

    helpers Sinatra::ContentFor
  end
end

class Application < Sinatra::Base
  # Use root directory as root
  set :app_file => '.'

  # Use HTML5
  set :haml, :format => :html5

  # Helpers
  helpers Sinatra::ContentFor
  helpers Rack::Nelumba::AuthorizationHelpers

  # SASS
  configure do
    Compass.configuration do |config|
      config.project_path = '.'
      config.sass_dir = 'views'
    end
  end
  set :sass, Compass.sass_engine_options
  set :scss, Compass.sass_engine_options

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
    if current_person
      haml :"people/dashboard"
    else
      haml :"home/index"
    end
  end

  # Settings
  get '/people/:id/settings' do
    status 404 and return if current_person.nil?
    haml :"people/settings", :locals => {
      :person => current_person
    }
  end

  # Appearance Settings
  get '/people/:id/edit_appearance' do
    status 404 and return if current_person.nil?
    haml :"people/edit_appearance", :locals => {
      :person => current_person
    }
  end

  # Render CSS from SCSS/SASS files
  get '/assets/css/:name.css' do
    content_type 'text/css', :charset => 'utf-8'
    sass(:"stylesheets/#{params[:name]}", Compass.sass_engine_options)
  end

  # Allow dynamic colors for any arbitrary svg files
  # XXX: assumes <?xml ... ?> line is the first line
  get '/assets/dynamic/:name.svg' do
    content_type = "image/svg+xml"

    if params["hex"]
      params["color"] = "##{params["hex"]}"
    elsif params["hue"] and params["sat"] and params["light"]
      params["color"] = "hsl(#{params["hue"]}, #{params["sat"]}%, #{params["light"]}%)"
    end

    if params["color"]
      require 'base64'

      headers 'Content-Type' => "image/svg+xml"
      css = "path, rect { fill: #{params["color"]} !important; stroke: #{params["color"]} !important }"
      embed = Base64.encode64(css)

      stream do |out|
        File.open("public/assets/images/#{params[:name]}.svg") do |f|
          out << f.readline
          out << "<?xml-stylesheet type=\"text/css\" href=\"data:text/css;charset=utf-8;base64,#{embed}\" ?>"
          out << f.read
        end
      end
    else
      send_file "public/assets/images/#{params[:name]}.svg"
    end
  end

  get '/styleguide' do
    haml :"styleguide"
  end
end

%w(config helpers controllers models).each do |dir|
    Dir[File.join(File.dirname(__FILE__), "../#{dir}", '*.rb')].each {|file| require file }
end
