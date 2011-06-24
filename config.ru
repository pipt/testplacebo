require 'rubygems'
require 'rack/contrib'

use Rack::Static, :urls => ["/stylesheets", "/javascripts", "/images"], :root => "public"
run lambda { |env| [200, { 'Content-Type' => 'text/html', 'Cache-Control' => 'public, max-age=86400' }, File.open('public/index.html', File::RDONLY)] }
