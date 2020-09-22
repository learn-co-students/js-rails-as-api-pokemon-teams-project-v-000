class PokemonsController < ApplicationController
  def index
    if params[:trainer_id]
      @pokemons = Pokemon.where(:trainer_id=>params[:trainer_id])
    else
      @pokemons = Pokemon.all
    end
    render json: @pokemons
  end

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainerId])
    render json: pokemon
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
    render json: {}
  end
end
