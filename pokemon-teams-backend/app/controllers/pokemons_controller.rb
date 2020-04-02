class PokemonsController < ApplicationController

  def index
    pokemons = Pokeman.all
    options = {
      include: [:trainer]
    }
    render json:PokemonSerializer.new(pokemons, options).serialized_json

  end

end
