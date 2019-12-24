class PokemonsController < ApplicationController
    def index
        pokemons = Sighting.all
        render json: PokemonSerializer.new(pokemons)
      end
end
