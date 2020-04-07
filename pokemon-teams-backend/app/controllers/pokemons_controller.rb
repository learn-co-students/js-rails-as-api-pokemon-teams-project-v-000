class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
  render json: PokemonSerializer.new(pokemons).to_serialized_json
  end

  def show
   pokemon = Pokemon.find_by(id: params[:id])
   render json: PokemonSerializer.new(pokemon).to_serialized_json
 end


 def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
  end

end
