class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        # render json: PokemonSerializer.new(pokemons)#.to_serialized_json #DID NOT WORK
        render json: pokemons
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        options = {
            include: [:trainer]
        }
        # render json: PokemonSerializer.new(pokemon)#.to_serialized_json #DID NOT WORK
        # render json: PokemonSerializer.new(pokemon, options) #DID NOT WORK
        render json: pokemon
    end
end
