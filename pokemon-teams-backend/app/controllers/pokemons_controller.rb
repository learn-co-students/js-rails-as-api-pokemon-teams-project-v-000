require 'faker'

class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    options = {
      include: [:trainer]
    }
    render json: PokemonSerializer.new(pokemons, options).serialized_json
  end

  def create
    trainer = Trainer.find_by(params[:id])
    pokemon = trainer.pokemons.create(species: Faker::Games::Pokemon.name, nickname: Faker::Name.first_name)
    redirect_to trainers_path
  end
end
