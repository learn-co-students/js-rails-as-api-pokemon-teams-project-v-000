class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: PokemonSerializer.new(pokemons)
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    render json: PokemonSerializer.new(pokemon)
  end

  def create
    pokemon = Pokemon.new(trainer_id: params[:trainer_id], nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
    pokemon.save
    redirect_to pokemon
  end

  private
  def pokemon_params
    params.require(:pokemon).permit(:trainer_id, :species, :nickname)
  end
end
