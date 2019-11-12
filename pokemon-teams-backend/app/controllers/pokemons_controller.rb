class PokemonsController < ApplicationController
  #new pokemon, and release pokemon

  def create
    new_pokemon = Pokemon.new(params)
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
  end

  def index
    pokemons = Pokemon.all
    render json: pokemons
  end
  
end
