class Application < Sinatra::Base
  # Application specific flags and such go here

  # Whether or not there is a login functionality
  REQUIRE_LOGIN = true

  # Number of rounds to encrypt passwords
  BCRYPT_ROUNDS = 12
end
