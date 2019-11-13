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
    render json: pokemons.to_json, include: [:species]
    #serializable hash for string.
  end

  def destroy
    # ded_pokemon =
    render json: Pokemon.find_by(id: params[:id]).destroy

  end

end
