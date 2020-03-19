class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    options = {
      include: [:trainer]
    }
    render json: PokemonSerializer.new(pokemons, options)
  end
end
