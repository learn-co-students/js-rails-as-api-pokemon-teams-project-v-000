class Pokemon < ApplicationRecord
  belongs_to :trainer

  def self.new_from_fetch
    pokemon = self.new 
    pokemon.nickname = Faker::Name.first_name
    pokemon.species = Faker::Games::Pokemon.name
    pokemon.save
    pokemon
  end

  def destroy_message
    {message: "You have successfuly set #{self.nickname}, the #{self.species} free!"}
  end
end
