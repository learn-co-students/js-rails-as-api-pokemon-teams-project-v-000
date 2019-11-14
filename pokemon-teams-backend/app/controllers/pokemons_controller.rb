class PokemonsController < ApplicationController
  #new pokemon, and release pokemon

  def create
    new_pokemon = Pokemon.create(nickname: params[:nickname], species: params[:species], trainer_id: params[:trainer_id])
    render json: new_pokemon.to_json
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
   pokemon = Pokemon.find_by(id: params[:id])
   ded_pokemon = pokemon.destroy
  # render json: ded_pokemon.to_json
  end

end
