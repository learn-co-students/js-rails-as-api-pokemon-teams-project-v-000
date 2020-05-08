require 'faker'

class PokemonsController < ApplicationController
  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    poke = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    
    render json: PokemonSerializer.new(poke).to_serialized_json
  end

  def destroy
    # This is interesting; I need to delete the Pokemon but ALSO return that Pokemon's JSON data.
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end
end
