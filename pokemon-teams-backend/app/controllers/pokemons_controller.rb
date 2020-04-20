class PokemonsController < ApplicationController
  # name = Faker::Name.first_name
  # species = Faker::Games::Pokemon.name
  # Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
  def index
    pokemons = Pokemon.all
    render json: pokemons, except: [:created_at, :updated_at]
  end

  def create
    nickname = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    Pokemon.create(nickname: nickname, species: species)
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
  end
end
