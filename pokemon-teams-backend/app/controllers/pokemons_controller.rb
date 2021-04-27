class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
      #  options = {include: [:trainer]}
        render json: PokemonSerializer.new(pokemons)
    end

    def show
        pokemon = Pokemon.find_by(params[:id])
        render json: PokemonSerializer.new(pokemon)
    end  
end
